import {tool} from "ai";
import {z} from "zod";

export const getDateTime = tool({
    description:
        "returns the current date and time. Useful for when you need current date and time", // this tells AI what this tool does. Tell what it does and when to use it
    inputSchema: z.object({}), // no input needed, but you can put info here
    execute: async () => {
        return new Date().toISOString();
    },
});