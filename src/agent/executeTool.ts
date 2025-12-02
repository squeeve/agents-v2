import { tools } from "./tools/index.ts";

export type ToolName = keyof typeof tools;

export const executeTools = async (name: ToolName, args: any) => {
    const tool = tools[name];
    if (!tool) {    // this is where prompt injection happens.
        return "Sorry, this tool is not ready yet; use something else, or let the user know and ask them what to do next.";
    }

    const execute = tool.execute!;

    const result = await execute(args as any, {
        toolCallId: '',
        messages: [],
    });

    return String(result);
};