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
    <section className="bg-paper px-section py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-ink">Research &amp; Blog</h2>
          <p className="text-body-lg text-ink">
            Technical articles, research findings, and insights from our team.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex h-10 items-center rounded-md bg-ink px-3 text-label font-medium text-paper transition-opacity hover:opacity-70"
        >
          View blog details
        </Link>

        <div className="grid w-full grid-cols-3 gap-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-[12.5rem] w-full">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="453px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <h3 className="line-clamp-2 text-title-3 font-medium text-ink">{post.title}</h3>
                  <div className="flex items-center gap-2 text-body-sm text-ink">
                    <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                    <span className="h-3 w-px bg-line-strong" />
                    <span>{Math.ceil(post.readingTime.minutes)} min read</span>
                  </div>
                  <p className="line-clamp-3 text-body text-ink">{post.summary}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
