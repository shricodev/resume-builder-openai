import { z } from "zod";
import { OpenAI } from "@trigger.dev/openai";
import { eventTrigger } from "@trigger.dev/sdk";

import { client } from "@/trigger";

const openai = new OpenAI({
  id: "openai",
  apiKey: process.env.OPENAI_API_KEY!,
});

client.defineJob({
  id: "openai-tasks",
  name: "OpenAI Tasks",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "openai.tasks",
    schema: z.object({
      prompt: z.string(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    const response = await io.openai.completions.backgroundCreate(
      "background-resume-generator",
      {
        model: "text-davinci-003",
        prompt: payload.prompt,
      }
    );

    await io.logger.info("choices", response.choices);
    return response.choices[0].text;
  },
});
