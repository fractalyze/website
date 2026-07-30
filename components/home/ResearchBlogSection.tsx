import Image from 'next/image';
import Link from 'next/link';
import {allBlogs} from '.contentlayer/generated';
import {compareDesc, format} from 'date-fns';
import {Reveal} from '@/components/Reveal';

export function ResearchBlogSection() {
  const posts = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-paper px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            Research &amp; Blog
          </h2>
          <p className="text-body-sm text-ink md:text-body-lg">
            Technical articles, research findings, and insights from our team.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex h-10 items-center rounded-md bg-ink px-3 text-label font-medium text-paper transition-opacity hover:opacity-70"
        >
          View blog details
        </Link>

        {/* Three across from tablet up, where the listing at /blog runs two:
            the frames draw them that way, and the listing's own comment gives
            the reason it differs. A lone post moves to the middle column so it
            does not sit against the left edge under a centred heading — which
            needs three columns to have a middle. */}
        <div
          className={`grid w-full grid-cols-1 gap-5 md:grid-cols-3 ${
            posts.length === 1 ? 'md:[&>*]:col-start-2' : ''
          }`}
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* The card treatment is components/BlogPostCard's, kept in
                    step by hand because this section's card is an h3 under the
                    section h2 and pads wider. The column count is not shared —
                    see above. */}
                <div className="relative aspect-[906/400] w-full xl:aspect-auto xl:h-[12.5rem]">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 453px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6 xl:p-8">
                  <h3 className="line-clamp-2 text-title-4 font-medium text-ink md:text-title-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-body-sm text-ink">
                    <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                    <span className="h-3 w-px bg-line-strong" />
                    <span>{Math.ceil(post.readingTime.minutes)} min read</span>
                  </div>
                  {post.summary && (
                    <p className="line-clamp-3 text-body-sm text-ink md:text-body">{post.summary}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
