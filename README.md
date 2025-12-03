# BUILD AN AI AGENT FROM SCRATCH, v2 (Scott Moss)

### prerequisites:

1. Get a couple bucks on the OpenAI API key and set it in a .env file in the project, or the 
$OPENAI_API_KEY env variable. 
2. Do a `npm install` from root to get necessary node_modules.
3. Two ways to run the agent:
    - npx tsx src/agent/run.ts
    - npm run start

## LESSON 01 NOTES: Creating an agent

`src/agent/run.ts`:
We first set up a generic agent function and `runAgent("Hey what's up")` and ran it with
the `npx tsx` command above.


## LESSON 02 NOTES: Adding a tool

### New and updated files:  
- `src/agent/tools/dateTime.ts`: creates a new tool, with a description for the AI to grok
- `src/agent/tools/index.ts`: registered the tool
- `src/agent/run.ts`: modified this to possibly use the tool when generating text.


## LESSON 03 NOTES: Evals

Scott said we really should be doing evals a large percentage of the time; most valuable skillset for
building production-ready agents. This is basically TDD for AI systems. Writing good evals is the art.

1. Different types of evals:
    - Single turn eval: kind of like unit tests  
    - Full turn eval: like an end2end tests

2. offline vs. online evals:
    - Offline: Fixed datasets using curated specific scenarios
    - Online: run in production on *actual* user traffic (more expensive)
        - sample actual user requests to eval 
        - uses LLM-as-judge for quality scoring

3. Where to get data:
    - synthetic data (expected example use cases -- good and bad)
    - production logs
    - edge case mining
    - hill climbing

For this section, we ended up using (Laminar)[https://laminar.sh/] to make traces.

### New and updated files:
    - `src/agent/run.ts`: added Laminar to trace.
    - `.env`: added Laminar key
    - pulled in the `./evals` folder, with prompt and data for evaluations
    - `evals/executors.ts`: single-turn executor data for evaluation
    - `evals/file-tools.eval.ts`: Sets up the evaluations



## LESSON 04 NOTES: Agent in the Loop

Creating loop in src/agent/run.ts -- look up chain of reasoning, for different types of LLM reasonings.

[Scott's original notes](https://publish.obsidian.md/agents-v2/course)

