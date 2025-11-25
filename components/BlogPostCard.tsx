import Link from 'next/link'
import { format } from 'date-fns'

interface BlogPostCardProps {
  slug: string
  title: string
  summary?: string
  date: string
  readingTime: any
  tags?: string[]
}

const BlogPostCard = ({ slug, title, summary, date, readingTime, tags }: BlogPostCardProps) => {
  return (
    <article className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-primary-700">
      <Link href={`/blog/${slug}`}>
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
          {title}
        </h2>
        {summary && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{summary}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
          <span>·</span>
          <span>{readingTime.text}</span>
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}

export default BlogPostCard
