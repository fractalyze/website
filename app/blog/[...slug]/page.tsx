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

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      ...(post.lastmod && {modifiedTime: post.lastmod}),
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
