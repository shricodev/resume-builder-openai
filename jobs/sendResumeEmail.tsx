import { z } from "zod";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Text } from "@react-email/text";
import { Body } from "@react-email/body";
import { Resend } from "@trigger.dev/resend";
import { Section } from "@react-email/section";
import { Preview } from "@react-email/preview";
import { eventTrigger } from "@trigger.dev/sdk";
import { Container } from "@react-email/container";

import { client } from "@/trigger";

// Email styling
const body = {
  padding: "10px 0",
  backgroundColor: "#87ceeb",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const section = {
  padding: "24px",
  border: "solid 2px #dedede",
  backgroundColor: "#fff",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  textAlign: "left" as const,
  fontSize: "16px",
};

function Email({ name, text }: { name: string; text: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your Resume is ready🎉🎉</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text>
              Hey {name}! click the below link to have access to your resume 🚀
            </Text>
            <Text>{text}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const resend = new Resend({
  // This ID should match your Resend integration ID on the 'Your connected integrations' dashboard.
  id: "resend",
  apiKey: process.env.RESEND_API_KEY!,
});

// This job sends a basic email built using React and Typescript
client.defineJob({
  id: "resend-email-form",
  name: "Resend: send email on form submit",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "send.email",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      text: z.string(),
      name: z.string(),
      // The 'from' email address must be a verified domain in your Resend account.
      from: z.string(),
    }),
  }),
  integrations: {
    resend,
  },
  run: async (payload, io, ctx) => {
    await io.resend.sendEmail("send-email", {
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      from: payload.from,
      react: <Email name={payload.name} text={payload.text} />,
    });
  },
});
