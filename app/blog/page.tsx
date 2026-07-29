import Link from 'next/link';
import {allBlogs} from '.contentlayer/generated';
import {compareDesc} from 'date-fns';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog',
  description: 'Research and technical articles from the Fractalyze team',
};

const categories = ['Research', 'Progress', 'Company'] as const;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{category?: string}>;
}) {
  const {category} = await searchParams;
  const selected = categories.find((entry) => entry === category);

  const posts = allBlogs
    .filter((post) => !post.draft)
    .filter((post) => !selected || post.category === selected)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <section className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-display-3 text-ink">Research &amp; Blog</h1>
          <p className="text-body-lg text-ink">
            Technical articles, research findings, and insights from our team.
          </p>
        </div>

        <ul className="flex flex-wrap gap-3">
          {categories.map((entry) => {
            const active = selected === entry;
            return (
              <li key={entry}>
                <Link
                  href={active ? '/blog' : `/blog?category=${entry}`}
                  aria-current={active ? 'true' : undefined}
                  className={`block rounded-full border px-4 py-1.5 text-caption transition-colors ${
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

        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-5 gap-y-10">
            {posts.map((post) => (
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
          <p className="text-body text-muted">No posts in this category yet.</p>
        )}
      </div>
    </section>
  );
}
