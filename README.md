# Fin & Games Website

The Fin & Games site is the home of the studio, its games and its writing. The visual direction is modern British indie: warm editorial paper tones, deep heritage green, seaside orange, considered typography and humour that never gets in the way of useful information.

## Structure

- \`/\` studio homepage
- \`/games\` game catalogue
- \`/games/caravan-park-tycoon\` Caravan Park Tycoon hub
- \`/games/caravan-park-tycoon/development\` game-specific devlogs
- \`/games/caravan-park-tycoon/features\` features
- \`/games/caravan-park-tycoon/roadmap\` roadmap
- \`/games/caravan-park-tycoon/expansions\` expansion area
- \`/blog\` studio-wide blog
- \`/news\` major announcements
- \`/about\` studio information
- \`/support\` support
- \`/npc-builder\` community/NPC prototype

Fin & Games remains the parent studio. Each game has its own section and content history; future games can be added under \`/games/<slug>\`.

## Content model

- Game development logs: \`src/content/games/<game-slug>/devlogs/\`
- Studio articles: \`src/content/blog/\`
- Major announcements: \`src/content/news/\`
- Unpublished studio drafts: \`src/content/drafts/blog/\`
- Unpublished game-devlog drafts: \`src/content/drafts/games/<game-slug>/\`

Draft directories are outside the published content collections. Never place an unreviewed draft in a published collection.

## Local development

Requires Node 22.12+.

\`\`\`sh
npm ci
npm run dev
npm run build
\`\`\`

## Profile-aware editorial workflow

Run the copyeditor against a Markdown draft. The original is never overwritten; YAML frontmatter is preserved verbatim and only the body is sent to Gemini.

\`\`\`sh
GEMINI_API_KEY=... node scripts/polish-article.mjs src/content/drafts/blog/my-draft.md --profile blog
GEMINI_API_KEY=... node scripts/polish-article.mjs src/content/drafts/blog/update.md --profile studio
GEMINI_API_KEY=... node scripts/polish-article.mjs src/content/drafts/games/caravan-park-tycoon/devlogs/my-devlog.md --profile devlog
\`\`\`

Profiles live in \`prompts/editorial/\`:

- \`blog.md\`: light-touch copyediting, natural British humour, minimal additions.
- \`studio.md\`: professional studio communications, no humour, no changes to the point or unsupported claims.
- \`devlog.md\`: structured bug fixes/features/changes, playful British patch-note voice and optional mysterious Bob references.

If \`--profile\` is omitted, the script infers a profile from the draft path: devlog/development paths select \`devlog\`, news/announcements/studio-update paths select \`studio\`, and other paths select \`blog\`. When in doubt, pass the profile explicitly.

The helper makes one text-generation call, preserves frontmatter and writes a separate \`.edited.md\` file without overwriting the source. Review the edited draft before publication. It does not publish content, research facts, or generate images. Never commit API keys.

## Editorial guardrails

- Blog humour is light and never forced.
- Studio updates are factual and professional. Business language may improve clarity but must not alter the message, certainty, scope or commitments.
- Devlogs can be playful, but technical claims must remain faithful to the source. Bob is a recurring mystery, not a mandatory joke and not an excuse to invent game behaviour.
- If the source is ambiguous, the model must not guess.
- API keys belong in environment variables or secret storage, never in the repository.

## Editorial desk and publishing workflow

The browser editor lives at `/admin/` and supports four editorial types:

- **Studio blog** — British English, light humour and minimal additions.
- **Studio update** — professional, factual and careful about dates, certainty and commitments.
- **News / announcement** — announcement-style studio news.
- **Game devlog** — structured development notes, patch lists and optional Bob mystery.

The editor saves Markdown drafts to the isolated `dev` branch, not `main`. Drafts use `draft: true` and are excluded from public collection pages. You can edit drafts, use the server-side Gemini copyeditor, upload images, insert inline Markdown images, set a cover image and explicitly approve a draft for the dev preview. Approval sets `draft: false` on `dev`; it does **not** merge or publish to production. Production changes only when you review and merge the approved content from `dev` into `main` and the production build succeeds.

Images are saved under `public/uploads/<post-slug>/` and can be referenced inline as `![Alt text](/uploads/<post-slug>/image-name.webp)`. JPEG, PNG, WebP, GIF and AVIF are supported up to 5 MB per image. The cover image is stored in the content frontmatter as `coverImage`, with `coverAlt` for accessibility. Keep original images backed up elsewhere; deleting a post does not automatically remove uploaded assets.

### Admin setup (required before use)

The dashboard shell is static, but every read/write API checks the Cloudflare Access JWT, audience, issuer, expiry and authorised email. Configure Cloudflare Access to protect `/admin/*` on the **development preview hostname**, with an allow policy for the authorised reviewer. Do not assume the dashboard is secure merely because its URL is obscure.

Set these Pages environment variables for the development preview:

- `CF_ACCESS_TEAM_DOMAIN`: Cloudflare Access team domain, without `https://`.
- `CF_ACCESS_AUD`: Audience (AUD) tag for the Access application protecting `/admin/*`.
- `ADMIN_EMAIL`: exact authorised reviewer email.
- `GITHUB_TOKEN` (secret): fine-grained token restricted to this repository, with Contents read/write permission.
- `CONTENT_BRANCH=dev`: the branch the editorial APIs are allowed to read and write.
- `GEMINI_API_KEY` (secret): server-side key for AI copyediting. It is never sent to the browser.
- `GEMINI_MODEL` (optional): model identifier; defaults to `gemini-2.5-flash`.

Configure and test the development preview first. Production Access policies and secrets must be configured separately only when you're ready. Never put secrets in repository files. If Access or the API secrets are missing, the APIs refuse to operate.

The API currently supports creating/editing drafts, image uploads, profile-aware copyediting and explicit approval to the dev preview. A rendered Markdown preview, image deletion/cleanup and a full publish/rollback history remain follow-up work. Do not treat this workflow as production-ready until the preview build, Access policy, secrets and full end-to-end flow have been tested.
