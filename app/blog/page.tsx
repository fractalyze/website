import { allBlogs } from '.contentlayer/generated'
import { compareDesc } from 'date-fns'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata = {
  title: 'Blog',
  description: 'Research and technical articles from the Fractalyze team',
}

export default function BlogPage() {
  const posts = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          Research & Blog
        </h1>
        <p className="mt-3 text-base text-gray-700 dark:text-gray-300">
          Technical articles, research findings, and insights from our team.
        </p>
      </div>

      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              summary={post.summary}
              date={post.date}
              readingTime={post.readingTime}
              tags={post.tags}
            />
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-950">
            <p className="text-gray-600 dark:text-gray-400">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
