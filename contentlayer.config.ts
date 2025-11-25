import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'

const computedFields = {
  readingTime: { type: 'json' as const, resolve: (doc: any) => readingTime(doc.body.raw) },
  slug: {
    type: 'string' as const,
    resolve: (doc: any) => doc._raw.flattenedPath.replace(/^blog\//, ''),
  },
  path: {
    type: 'string' as const,
    resolve: (doc: any) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string' as const,
    resolve: (doc: any) => doc._raw.sourceFilePath,
  },
  toc: {
    type: 'json' as const,
    resolve: async (doc: any) => {
      const slugger = new GithubSlugger()
      const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
      const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        ({ groups }: any) => {
          const flag = groups?.flag
          const content = groups?.content
          return {
            level: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          }
        }
      )
      return headings
    },
  },
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    draft: { type: 'boolean', required: false },
    summary: { type: 'string', required: false },
    authors: { type: 'list', of: { type: 'string' }, required: false, default: ['default'] },
    layout: { type: 'string', required: false, default: 'PostLayout' },
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string', required: false },
    occupation: { type: 'string', required: false },
    company: { type: 'string', required: false },
    email: { type: 'string', required: false },
    twitter: { type: 'string', required: false },
    linkedin: { type: 'string', required: false },
    github: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^authors\//, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Author],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeKatex,
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    ],
  },
})
