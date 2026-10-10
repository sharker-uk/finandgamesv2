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

## Admin publishing workflow

A future browser-based editor should follow the same safety model as Sam's site: private admin routes protected by Cloudflare Access, drafts and edits reviewed before publication, GitHub as the source of truth, and Cloudflare Pages deploying only approved changes. Do not expose a write-capable publishing API publicly. Cloudflare Access and GitHub secrets require explicit environment configuration and end-to-end verification before the workflow is considered live.
