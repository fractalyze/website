import {ReactNode} from 'react';
import Link from 'next/link';
import {format} from 'date-fns';

type Sibling = {slug: string; title: string} | null;

interface PostLayoutProps {
  content: ReactNode
  title: string
  date: string
  readingTime: {minutes: number}
  previous?: Sibling
  next?: Sibling
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({direction}: {direction: 'left' | 'right'}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`h-6 w-6 ${direction === 'left' ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path
        d="M4 12h16m0 0-6-6m6 6-6 6"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PostLayout = ({content, title, date, readingTime, previous, next}: PostLayoutProps) => {
  return (
    <article className="bg-paper px-section py-20">
      {/*
        Alone on the site, an article is sized in pixels rather than rem.
        Everything else scales with the viewport so the design keeps its
        proportions at any desktop width, but prose is read rather than looked
        at: scaling it only shrinks the text on a smaller screen without
        shortening the line, since the measure scales with it. A reading column
        wants a fixed measure and a size that stays legible, so this one holds
        at roughly ninety characters however wide the window gets.
      */}
      <div className="mx-auto flex w-[730px] max-w-full flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-[32px] font-semibold leading-[1.1] text-ink">{title}</h1>
          <hr className="border-t-2 border-ink" />
          <div className="flex items-center gap-4 text-[14px] text-ink">
            <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
            <span className="h-4 w-px bg-line-strong" />
            <span>{Math.ceil(readingTime.minutes)} min read</span>
          </div>
        </header>

        <div className="prose">{content}</div>

        <nav className="flex items-center justify-between border-t border-line pt-6 text-[14px] text-ink">
          <Link href="/blog" className="flex items-center gap-1 transition-opacity hover:opacity-70">
            <MenuIcon />
            View List
          </Link>
          <div className="flex items-center gap-4">
            {previous && (
              <Link
                href={`/blog/${previous.slug}`}
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <ArrowIcon direction="left" />
                Previous Post
              </Link>
            )}
            {previous && next && <span className="h-4 w-px bg-line-strong" />}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                Next Post
                <ArrowIcon direction="right" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </article>
  );
};

export default PostLayout;
