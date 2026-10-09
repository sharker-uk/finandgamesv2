# Studio blog drafts

Keep unpolished source drafts here until they are ready for editorial review. This folder is deliberately outside the published src/content/blog/ collection, so drafts are not rendered as public articles.

## Suggested workflow

1. Save a Markdown draft, optionally with YAML frontmatter.
2. Run the one-pass editor from the repository root: `GEMINI_API_KEY=... node scripts/polish-article.mjs src/content/drafts/blog/my-draft.md`
3. Review the generated my-draft.edited.md against the source. The script never overwrites the original.
4. Confirm facts, links, metadata and image paths yourself.
5. Move the approved article into src/content/blog/ and ensure draft: false (or omit the field).
6. Build and review the site before merging or deploying.

The editor uses one Gemini text-generation call. It does not perform research, generate images, or publish anything. Set GEMINI_MODEL to override the default model name if needed. Never commit API keys.
