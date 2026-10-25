This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Chat Widget (Ask about Sujit)

A floating avatar bubble (bottom-right, every page) opens a small chat panel
that answers visitor questions about Sujit using Claude, grounded only in
`src/content/profile.ts` and `src/content/resume.ts` — no other context or
tools. The avatar itself is a hand-authored
[`bible-strong-avatar-lab`](https://github.com/smontlouis/bible-strong-avatar-lab)
definition at `src/content/avatar/sujit.avatar.json`, rendered with
`@bible-strong/avatar-react` (AGPL-3.0 package, used here as an unmodified
dependency) — it blinks idly, switches to a "thinking" animation while a
reply is in flight, and briefly "talks" when the reply lands.

**Requires `ANTHROPIC_API_KEY`** (server-side only, never exposed to the
client) — set it in `.env.local` for local dev and as a Cloudflare Pages
project secret for production. Without it, the widget still renders and
opens; sending a message just replies "Assistant is not configured yet."
instead of erroring.

The API route (`app/api/chat/route.ts`) runs on the edge, caps input to
500 characters and 8 turns per conversation, and its system prompt
explicitly refuses to answer anything unrelated to Sujit or follow
instructions embedded in a visitor's message.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
