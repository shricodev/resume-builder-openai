import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";
import { generateResumeText } from "@/utils/openai";

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
  run: async (payload, io, ctx) => {
    await io.logger.info(payload.prompt);
    const record = await io.runTask("openai-task", async (task) => {
      const response = await generateResumeText(payload.prompt);
      console.log(response);
      return response;
    });
  },
});
