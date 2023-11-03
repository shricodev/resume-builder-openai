import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "resume-builder-gpt4-pyda",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
