// import 'dotenv/config';

import { generateText, stepCountIs, type ModelMessage } from 'ai';
import { openai } from '@ai-sdk/openai';  
import {tools} from './tools/index.ts';
import { SYSTEM_PROMPT } from './system/prompt.ts';

import type {AgentCallbacks} from '../types.ts'

const MODEL_NAME = "gpt-5-mini";


export async function runAgent(
    userMessage: string,
    conversationHistory: ModelMessage[],
    callbacks: AgentCallbacks,
): Promise<any> {
    // Filter and check if we need to compact the conversation
    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        toolChoice: 'none', // default: 'auto'... other choices: 'none', name of tool, etc.
        stopWhen: stepCountIs(2),
    });

    toolCalls.forEach(async (toolCall) => {
        const result = await executeTool(
            toolCall.toolName,
            toolCall.input as Record<string, unknown>,
        );
        console.log(result);
    });

    console.log(text);
};

runAgent("what is the current time?", []);
