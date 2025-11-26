import {ReactNode} from 'react';
import Link from 'next/link';
import {format} from 'date-fns';

interface PostLayoutProps {
  content: ReactNode
  title: string
  date: string
  lastmod?: string
  readingTime: any
  tags?: string[]
  toc?: any[]
}

const PostLayout = ({
  content, title, date, lastmod, readingTime, tags, toc: _toc,
}: PostLayoutProps) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to blog
          </Link>
        </div>
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={date} className="font-medium">
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <span>{readingTime.text}</span>
          {lastmod && lastmod !== date && (
            <>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>Updated {format(new Date(lastmod), 'MMMM d, yyyy')}</span>
            </>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose dark:prose-invert">
        {content}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to blog
        </Link>
      </div>
    </article>
  );
};

export default PostLayout;
