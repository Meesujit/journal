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
that answers visitor questions about Sujit using the Gemini API (free tier,
`gemini-2.5-flash`), grounded only in `src/content/profile.ts` and
`src/content/resume.ts` — no other context or tools. The avatar itself is a
hand-authored
[`bible-strong-avatar-lab`](https://github.com/smontlouis/bible-strong-avatar-lab)
definition at `src/content/avatar/sujit.avatar.json`, rendered with
`@bible-strong/avatar-react` (AGPL-3.0 package, used here as an unmodified
dependency) — it blinks idly, switches to a "thinking" animation while a
reply is in flight, and briefly "talks" when the reply lands. The body uses
the library's `mickey` surface at low `roundness` to show distinct ear
lobes rather than a plain circle, and the idle loop cycles real 3D head
rotation (`head.y` yaw) between `look-left`/`look-right` expressions, which
the renderer projects with perspective and occlusion — that's what gives
it the parallax "looking around" effect rather than a flat 2D wobble.

**Requires `GEMINI_API_KEY`** (server-side only, never exposed to the
client; get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey))
— set it in `.env.local` for local dev and as a Cloudflare Pages project
secret for production. Without it, the widget still renders and opens;
sending a message just replies "Assistant is not configured yet." instead
of erroring. Free-tier Gemini traffic may be used by Google to improve
their models — don't send anything sensitive through it.

**Abuse protections** (defense in depth, not a single hard guarantee):
- The system prompt is scoped to Sujit-only Q&A and explicitly refuses
  roleplay/persona-override/"ignore previous instructions" attempts —
  verified directly: it declines off-topic asks and injection attempts
  in testing.
- Input is capped at 500 characters and 16 messages per request; the UI
  additionally caps a conversation at 8 turns client-side.
- A same-origin check rejects any request whose `Origin` header doesn't
  match the host serving it — blocks casual cross-site script abuse
  without hardcoding the deployed domain.
- A best-effort per-IP rate limit (15 requests / 10 minutes) lives in
  the edge route's module scope. It's per-isolate, not globally
  coordinated, so treat it as throttling a single abusive script, not a
  distributed-attack defense.
- The real backstop is that `gemini-2.5-flash`'s free tier has **no
  billing attached** — worst case if all of the above is bypassed is the
  free quota running out (the widget then just stops answering) rather
  than a surprise bill.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
