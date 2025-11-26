# Fractalyze Website

The official website for Fractalyze - Building Zorch, the TensorFlow for Zero-Knowledge.

## Project Structure

```
website/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with header/footer
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   └── blog/             # Blog pages
├── components/           # React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer
│   ├── ThemeSwitch.tsx   # Dark mode toggle
│   ├── BlogPostCard.tsx  # Blog post preview
│   └── MDXComponents.tsx # Custom MDX components
├── layouts/              # Page layouts
│   └── PostLayout.tsx    # Blog post layout
├── data/                 # Content
│   ├── blog/             # Blog posts (MDX)
│   ├── authors/          # Author profiles (MDX)
│   ├── siteMetadata.js   # Site configuration
│   └── headerNavLinks.ts # Navigation links
└── contentlayer.config.ts # Content processing config
```

## Adding Blog Posts

1. Create a new `.mdx` file in `data/blog/`:

```bash
data/blog/my-new-post.mdx
```

2. Add frontmatter:

```yaml
---
title: 'Your Post Title'
date: '2024-11-25'
tags: ['zk', 'compiler']
draft: false
summary: 'A brief summary of your post'
authors: ['default']
---
```

3. Write your content using Markdown/MDX

4. The post will automatically appear in the blog listing

### Supported Features in Blog Posts

- **Code blocks** with syntax highlighting
- **Math equations** using KaTeX (inline: `$E=mc^2$` or block: `$$...$$`)
- **Tables** using GitHub Flavored Markdown
- **Images** via MDX Image component
- **Custom components** via MDX

## Contact

For questions or support: contact@fractalyze.io
