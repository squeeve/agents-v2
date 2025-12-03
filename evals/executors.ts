import {generateText, stepCountIs, tool, type ToolSet} from "ai";
import {openai} from "@ai-sdk/openai";
import {map, z} from "zod";

import type {
  EvalData,
  SingleTurnResult,
  MultiTurnEvalData,
  MultiTurnResult,
} from "./types.ts";
import {buildMessages, buildMockedTools} from "./utils.ts";
import { resourceLimits } from "worker_threads";

const TOOL_DEFINITIONS: Record<
  string,
  {description: string, parameters: z.ZodObject<z.ZodRawShape>}
> = {
  readFile: {
    description: "Read the contents of a file at the specified path",
    parameters: z.object({
      path: z.string().describe("the path of the file you want to read"),
    }),
  },
  writeFile: {
    description: "Write given content to the file at the given path",
    parameters: z.object({
      path: z.string().describe("the path to the file that you want to write to"),
      content: z.string().describe("the content you want to write to the file"),
    }),
  },
  listFiles: {
    description: "List all the files in the directory",
    parameters: z.object({
      path: z.string().describe("the directory in which you want the listing of files"),
    }),
  },
  deleteFile: {
    description: "Delete the file at the given path",
    parameters: z.object({
      path: z.string().describe("the path to the file you want to delete"),
    }),
  },
  runCommand: {
    description: "Execute a shell command and return its output",
    parameters: z.object({
      command: z.string().describe("the shell command to execute"),
    }),
  },
};

export const singleTurnExecutorWithMocks = async (data: EvalData) => {
  const messages = buildMessages(data);

  const tools: ToolSet = {};
  for (const toolName of data.tools) {
    const def = TOOL_DEFINITIONS[toolName];
    if (def) {
      tools[toolName] = tool({
        description: def.description,
        inputSchema: def.parameters,
      });
    }
  }

  const {toolCalls} = await generateText({
    model: openai(data.config?.model ?? "gpt-5-mini"),
    messages,
    tools,
    stopWhen: stepCountIs(1),
  });

  const allTools: string[] = [];
  const steps = resourceLimits.steps.map((step) => {
    const stepToolCalls = (step.toolCalls >> [])map.((tc) => {
      allTools.push(tc.toolName);
      return {
        toolName: tc.toolName,
        args: "args" in tc ? tc.args : {},
      };
    });

    const stepToolResults = (step.staticToolResults ?? []).map((tr) => {
      toolNames: tr.toolName,
      result: "results" in tr ? tr.results : tr,
    }));
};