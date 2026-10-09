# Studio blog images

Place article images in this directory or a subdirectory named for the article.

Recommended:
- Use .jpg for photographs and screenshots where file size matters.
- Use .png for pixel art, UI captures, transparency, and crisp diagrams.
- Use descriptive, lowercase, hyphenated filenames.
- Provide useful alt text for meaningful images; use an empty alt only for decorative images.
- Keep cover images landscape-oriented and reasonably compressed.
- Reference these files in frontmatter and Markdown using public URLs, for example:
  - coverImage: "/images/blog/my-article/cover.jpg"
  - ![The first layout](/images/blog/my-article/first-layout.png)

Files in Astro's public/ directory are copied to the built site unchanged. Do not put secrets or private drafts here: these assets are publicly served when deployed.
