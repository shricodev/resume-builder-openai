"use server";

import { client } from "@/trigger";

export async function sendEmail(
  to: string,
  subject: string,
  name: string,
  text: string,
  from: string
) {
  return await client.sendEvent({
    name: "send.email",
    payload: {
      to,
      subject,
      text,
      name,
      from,
    },
  });
}
