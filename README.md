## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd resume-builder-gpt4
   ```

4. Rename `.env.local.example` to `.env.local` and update all the `.env` variables:

```bash
TRIGGER_API_KEY=
TRIGGER_API_URL=
NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY=

NEXT_PUBLIC_OPENAI_API_KEY=

NEXT_PUBLIC_SUPABASE_PROJECT_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=

RESEND_API_KEY=

```

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server along with Trigger.dev:

```bash
npm run dev
npx @trigger.dev/cli@latest dev
```

The project should now be running on [localhost:3000](http://localhost:3000/).
