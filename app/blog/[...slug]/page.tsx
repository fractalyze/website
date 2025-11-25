import { allBlogs } from '.contentlayer/generated'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/MDXContent'
import PostLayout from '@/layouts/PostLayout'

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params
  const slug = slugArray?.join('/') || ''
  const post = allBlogs.find((post) => post.slug === slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      ...(post.lastmod && { modifiedTime: post.lastmod }),
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params
  const slug = slugArray?.join('/') || ''
  const post = allBlogs.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <PostLayout
      title={post.title}
      date={post.date}
      lastmod={post.lastmod}
      readingTime={post.readingTime}
      tags={post.tags}
      toc={post.toc}
      content={<MDXContent code={post.body.code} />}
    />
  )
}
