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
    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        stopWhen: stepCountIs(2),
    });

    console.log(text, toolCalls);
};

runAgent("what is the current time?", []);
