import {Suspense} from 'react';
import {allBlogs} from '.contentlayer/generated';
import {compareDesc} from 'date-fns';
import {BlogListing} from '@/components/BlogListing';

export const metadata = {
  title: 'Blog',
  description: 'Research and technical articles from the Fractalyze team',
  // The category chips put the filter in the query string, so without this
  // every filtered view is a separate URL serving the same listing.
  alternates: {canonical: '/blog'},
  openGraph: {
    title: 'Blog',
    description: 'Research and technical articles from the Fractalyze team',
    url: '/blog',
    images: ['/images/og.jpg'],
  },
};

export default function BlogPage() {
  // Every post is sent down and the chips narrow the list in the browser, so
  // this page stays static — see BlogListing for why that matters.
  const posts = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      date: post.date,
      image: post.image,
      category: post.category,
      readingTime: post.readingTime,
    }));

  return (
    <section className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-display-3 text-ink">Research &amp; Blog</h1>
          <p className="text-body-lg text-ink">
            Technical articles, research findings, and insights from our team.
          </p>
        </div>

        {/* useSearchParams needs a boundary to fall back to while the client
            catches up; the chips and the unfiltered grid are already in the
            prerendered HTML, so there is nothing to show in its place. */}
        <Suspense>
          <BlogListing posts={posts} />
        </Suspense>
      </div>
    </section>
  );
}
