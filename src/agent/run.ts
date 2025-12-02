// import 'dotenv/config';

import { generateText, stepCountIs, type ModelMessage } from 'ai';
import { openai } from '@ai-sdk/openai';  
import {getTracer, Laminar} from '@lmnr-ai/lmnr';
import {tools} from './tools/index.ts';
import { SYSTEM_PROMPT } from './system/prompt.ts';

import type {AgentCallbacks} from '../types.ts'

const MODEL_NAME = "gpt-5-mini";
Laminar.initialize({
    projectApiKey: process.env.LMNR_PROJECT_API_KEY
})

export async function runAgent(
    userMessage: string,
    conversationHistory: ModelMessage[],
    callbacks: AgentCallbacks,
): Promise<any> {
    // Filter and check if we need to compact the conversation

    // The following call is actually what creates the agent.
    const {text} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        experimental_telemetry: {
            isEnabled: true,
            tracer: getTracer(),
        },
        stopWhen: stepCountIs(2),   // (1) didn't return the answer.
    });

    await Laminar.flush();  // just in case you don't get any traces.

    console.log(text);
};

