import {evaluate} from '@lmnr-ai/lmnr';
import {toolOrderCorret, toolsAvoided, llmJudge} from "./evaluators";

import type {
    MultiTurnEvalData,
    MultiTurnDatasetEntry,
    MultiTurnResult,
    MultiTurnTarget,
} from "./types";

import dataset from "./data/agent-multiturn.json" with {type: 'json'};
import {multiTurnWithMocks} from "./executors"
import { Output } from 'ai';

const executor = async (data: MultiTurnEvalData) => {
    return multiTurnWithMocks(data);
};

evaluate({
    data: dataset as any,
    executor, 
    evaluators: {
        outputQuality: async (Output: any, target: any) => {
            if (!target) return 1;
            return llmJudge(Output, target);
        },
    },
    config: {
        projectApiKey: process.env.LMNR_PROJECT_API_KEY,
    },
    groupName: "agent-multiturn",
});