'use client';

import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import BlogPostCard from '@/components/BlogPostCard';

export const categories = ['Tech', 'Business', 'Product'] as const;
export type Category = (typeof categories)[number];

export type ListedPost = {
  slug: string;
  title: string;
  summary?: string;
  date: string;
  /** The schema supplies a default cover, so a post never arrives without one. */
  image: string;
  category?: string;
  readingTime: {minutes: number};
};

/**
 * The chips and the grid, filtered on the client.
 *
 * Reading the category here rather than from the page's searchParams is what
 * keeps /blog a static route. A page that awaits searchParams is rendered per
 * request, and Next streams a streamed page's metadata into the body — which
 * put the listing's description and canonical somewhere no crawler reads them.
 * The filter still lives in the URL, so a filtered view is still a link.
 */
export function BlogListing({posts}: {posts: ListedPost[]}) {
  const active = useSearchParams().get('category');
  const selected = categories.find((entry) => entry === active);
  const shown = posts.filter((post) => !selected || post.category === selected);

  return (
    <>
      <ul className="flex flex-wrap gap-3">
        {categories.map((entry) => {
          const active = selected === entry;
          return (
            <li key={entry}>
              <Link
                href={active ? '/blog' : `/blog?category=${entry}`}
                aria-current={active ? 'true' : undefined}
                className={`block rounded-full border px-5 py-2 text-label transition-colors ${
                  active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-paper text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {entry}
              </Link>
            </li>
          );
        })}
      </ul>

      {shown.length > 0 ? (
        /*
          A tablet pair lands at about the 453px the card is drawn at; three
          columns on a 1024 frame would give it 301px.
        */
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
          {shown.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              summary={post.summary}
              date={post.date}
              image={post.image}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      ) : (
        <p className="text-body-sm text-muted md:text-body-lg">No posts in this category yet.</p>
      )}
    </>
  );
}
