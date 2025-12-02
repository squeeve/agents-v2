# BUILD AN AI AGENT FROM SCRATCH, v2 (Scott Moss)

## PREREQ:

1. Get a couple bucks on the OpenAI API key and set it in a .env file in the project, or the 
$OPENAI_API_KEY env variable. 
2. Do a `npm install` from root to get necessary node_modules.
3. Two ways to run the agent:
    - npx tsx src/agent/run.ts
    - npm run start


## LESSON 01 NOTES:

We first created a generic agent function and `runAgent("Hey what's up")` in src/agent/run.ts
Then we ran it using the `npx tsx` command above.


## LESSON 02 NOTES:

New and updated files:
======================
`src/agent/tools/dateTime.ts`: creates a new tool, with a description for the AI to grok
`src/agent/tools/index.ts`: registered the tool
`src/agent/run.ts`: modified this to possibly use the tool when generating text.


[Scott's original notes](https://publish.obsidian.md/agents-v2/course)

