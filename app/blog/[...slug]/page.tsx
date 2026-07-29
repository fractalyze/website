import {allBlogs} from '.contentlayer/generated';
import {notFound} from 'next/navigation';
import {compareDesc} from 'date-fns';
import {MDXContent} from '@/components/MDXContent';
import PostLayout from '@/layouts/PostLayout';

const published = allBlogs
  .filter((post) => !post.draft)
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export async function generateMetadata({params}: { params: Promise<{ slug: string[] }> }) {
  const {slug: slugArray} = await params;
  const slug = slugArray?.join('/') || '';
  const post = allBlogs.find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  // A shared link with no picture is a link nobody clicks, so the post's own
  // cover doubles as its card art. Twitter is spelled out rather than left to
  // fall through to the root, which would caption every article with the site
  // description.
  const cover = post.image ?? '/images/blog/default-cover.webp';
  const path = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {canonical: path},
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url: path,
      images: [cover],
      publishedTime: post.date,
      ...(post.lastmod && {modifiedTime: post.lastmod}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [cover],
    },
  };
}

export default async function BlogPost({params}: { params: Promise<{ slug: string[] }> }) {
  const {slug: slugArray} = await params;
  const slug = slugArray?.join('/') || '';
  const post = allBlogs.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Newest first, so the neighbour above a post is the newer one.
  const index = published.findIndex((entry) => entry.slug === slug);
  const newer = index > 0 ? published[index - 1] : null;
  const older = index >= 0 && index < published.length - 1 ? published[index + 1] : null;

  return (
    <PostLayout
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
      previous={older && {slug: older.slug, title: older.title}}
      next={newer && {slug: newer.slug, title: newer.title}}
      content={<MDXContent code={post.body.code} />}
    />
  );
}
