---
name: blog-post
description: Turn a plain Markdown draft into a published post in this repo — derives the slug, fills the frontmatter Contentlayer requires, relocates and rewrites image paths, and verifies the post builds and appears on the site. Use when the user hands over a .md/.mdx draft to publish, asks to add an article to the blog, or says "이 글 블로그에 올려줘" / "publish this post".
---

# Publishing a blog post

The blog is file-based: a post is one `.mdx` file under `data/blog/`, compiled by
Contentlayer at build time. There is no CMS and no database. Pushing to `main`
deploys to production (fractalyze.io) through the connected Vercel project.

## What you are given, and what you produce

Input is usually a Markdown draft written somewhere else — no frontmatter, or
frontmatter in a different shape, and images sitting next to it or hotlinked.

Output is `data/blog/<slug>.mdx` with the frontmatter below, images under
`public/blog/<slug>/`, and a build that renders the post.

## The slug is the URL

The filename becomes the path: `data/blog/packed-poseidon2.mdx` serves at
`/blog/packed-poseidon2`. Derive it from the title in lower kebab-case, trimming
filler. Keep it short and stable — **changing it later breaks every inbound link**,
so confirm the slug with the user before writing if the title is long or awkward.

Check for a collision first: `ls data/blog/`.

## Frontmatter

```yaml
---
title: 'Packed Poseidon2 and JAX Code Generation'
date: '2026-07-30'
tags: ['zkp', 'poseidon2', 'jax']
draft: false
category: 'Product'
summary: 'One or two sentences. This is what the card on /blog and the home page shows, and what search engines quote.'
authors: ['Ryan Kim']
image: '/blog/packed-poseidon2/cover.png'
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Rendered as the page heading; no Markdown syntax inside |
| `date` | yes | `YYYY-MM-DD`. Drives ordering, the visible date, and previous/next links |
| `summary` | no, but always write one | Card copy is clamped to three lines — aim for 150–220 characters |
| `category` | no | `Tech` \| `Business` \| `Product`. Defaults to `Tech`. Drives the filter chips on `/blog` |
| `tags` | no | Stored but not currently displayed anywhere |
| `draft` | no | `true` hides the post from `/blog` and the home page; the URL still resolves |
| `authors` | no | Free-form strings, not validated against `data/authors/` |
| `image` | no, but always set one | Card thumbnail — see [Choosing the cover](#choosing-the-cover) |
| `lastmod` | no | `YYYY-MM-DD` |

Ask the user for `date` and `category` if the draft does not imply them. Do not
invent a `summary` that overstates a result — lift it from the opening paragraph.

## Choosing the cover

Every post needs an `image`, and it is the first thing a reader sees. Work down
this list and stop at the first step that yields one:

1. A fitting cover already in `public/blog/covers/` — see the table below.
2. A search, if an image API key is in the environment — see [Sourcing a new
   one](#sourcing-a-new-one).
3. **Ask the user for an image URL.** Say plainly that the library has no good
   match and no search key is configured, and ask them to paste a link or point
   at a file. Then download it and put it through the same crop and encode.

Never quietly fall back to `/images/blog/default-cover.webp` because the first
two steps came up empty — that ships a post wearing another post's picture. Ask.

The library was cut from the design and shares its treatment, so any of its
frames sits correctly next to the others on `/blog`.

| File | Shows | Reach for it when |
|---|---|---|
| `abstract-prism-facets.webp` | Dark geometric planes, hard spectral edges | Compilers, IR, low-level performance |
| `abstract-prism-blur.webp` | Soft out-of-focus spectrum | Theory, protocols, anything without a concrete subject |
| `abstract-fluted-glass.webp` | Ridged glass, repeating refraction | Parallelism, batching, throughput |
| `window-over-mountains.webp` | Aircraft window over terrain | Scale, distance covered, progress reports |
| `pair-at-laptop.webp` | Two people working together | Engagements, collaboration, hiring |
| `atrium-stairs.webp` | Figure on stairs in a bright atrium | Company direction, milestones |
| `whiteboard-session.webp` | Presenting at a whiteboard | Talks, workshops, teaching |
| `focused-at-laptop.webp` | One person working, low light | Deep work, research notes |

Prefer the abstract four for technical posts and keep the people photographs for
posts actually about the team; a stock face on a compiler benchmark reads as
filler. Vary the choice across consecutive posts so the listing does not show the
same picture twice in a row.

### Sourcing a new one

The library is a starting set, not a ceiling. Once a post has no good match —
which happens quickly, since repeating a cover two posts apart is obvious —
search for a new one rather than reaching for the nearest miss.

**The tone to match:** spectral refraction over a restrained, mostly desaturated
frame. Light split through glass or crystal, deep shadow, one band of colour
doing the work. No text, no logos, no product shots, no saturated colour
competing with the accent lilac, no stock-photo staging (handshakes, pointing at
monitors).

**Search terms that land in it,** roughly ordered by hit rate: `prism light
refraction`, `crystal caustics`, `dichroic glass`, `light through fluted glass`,
`spectrum on concrete`, `iridescent film macro`. Bend the term toward the post's
subject when there is an honest link — `lattice` for polynomial work, `parallel
lines` for batching — but never at the cost of the tone.

**Where to search.** Openverse needs no key but holds almost nothing in this
aesthetic: filtered to commercially licensed photographs it returns single digits
per query. Use Pexels or Unsplash, both free. **If neither key is set, do not
substitute Openverse or the default cover — go to step 3 and ask the user for a
URL.**

```bash
# Pexels — key in PEXELS_API_KEY
curl -s -H "Authorization: $PEXELS_API_KEY" \
  "https://api.pexels.com/v1/search?query=prism+light+refraction&orientation=landscape&per_page=15" \
  | jq -r '.photos[] | "\(.id)\t\(.width)x\(.height)\t\(.src.original)"'

# Unsplash — key in UNSPLASH_ACCESS_KEY
curl -s "https://api.unsplash.com/search/photos?query=prism+light+refraction&orientation=landscape&per_page=15" \
  -H "Authorization: Client-ID $UNSPLASH_ACCESS_KEY" \
  | jq -r '.results[] | "\(.id)\t\(.width)x\(.height)\t\(.urls.raw)"'
```

Both licences permit commercial use without attribution. Keys are authoring-time
only — keep them in the environment, never in the repo.

**Always show candidates before committing one.** Download three or four, build a
contact sheet, and let the user choose; a cover is the first thing a reader sees
and taste is not delegable. Then crop to 906×400 (centre crop unless the subject
sits off-centre), save as webp at quality ~84 into `public/blog/covers/`, and add
a row to the table above so the next post can see it exists.

`image` may be omitted; it falls back to `/images/blog/default-cover.webp`. That
default exists so a half-written draft still renders, not as an answer to "which
cover" — reach step 3 above before you let a post ship on it.

## Images in the body

Put every image the post uses under `public/blog/<slug>/` and reference it from
the body with a root-relative path:

```markdown
![Runtime comparison on c7g](/blog/packed-poseidon2/runtime-c7g.png)
```

Rewrite whatever the draft used — relative paths, absolute local paths, or URLs
pointing at a wiki or Notion export. Download remote images rather than
hotlinking them; the originals disappear. Give each file a descriptive
lower-kebab-case name; do not carry over names like
`Screenshot_2026-07-30_at_10.09.35_AM.png`.

Large source images belong in `public/` unoptimized only if small. Anything over
roughly 500KB should be resized to at most 2× its display width and converted to
webp before committing.

## Body conversion

The pipeline is MDX with GFM, math, and Prism highlighting, so most Markdown
passes through untouched. Watch for these:

- **Fence every code block with its language** (` ```rust `, ` ```python `,
  ` ```mlir `). Unlabelled blocks fall back to JavaScript highlighting and look
  wrong. `mlir` and `hlo` are aliased to LLVM, `c++` to `cpp`.
- **Math** uses `$…$` inline and `$$…$$` display, rendered by KaTeX.
- **MDX treats `<` and `{` as syntax.** Bare generics (`Vec<u32>`) or braces in
  prose break the build — wrap them in backticks.
- **Start the body at `##`.** The `title` frontmatter already renders the `h1`.
- Tables, blockquotes, and nested lists are styled; horizontal rules are not used
  in this design.

## Verify before you call it done

```bash
srun npm run build
```

Contentlayer prints the document count; a schema error names the offending file
and field. Then check the post actually surfaces:

```bash
curl -s localhost:3000/blog/<slug> -o /dev/null -w '%{http_code}\n'
curl -s localhost:3000/blog | grep -c '<slug>'
```

A post with `draft: true` will build but will not appear in either listing —
that is expected, not a failure.

## Publishing

Commit the `.mdx` and its images together, then push. A branch push gives a
Vercel preview URL; merging to `main` publishes to fractalyze.io. Do not push to
`main` directly without the user asking for it.
