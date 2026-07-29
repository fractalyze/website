import Image from 'next/image';
import Link from 'next/link';
import {format} from 'date-fns';

interface BlogPostCardProps {
  slug: string
  title: string
  summary?: string
  date: string
  image: string
  readingTime: {minutes: number}
}

const BlogPostCard = ({slug, title, summary, date, image, readingTime}: BlogPostCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-[12.5rem] w-full">
          <Image src={image} alt="" fill sizes="453px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <h2 className="line-clamp-2 text-title-3 font-medium text-ink">{title}</h2>
          <div className="flex items-center gap-2 text-body-sm text-ink">
            <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
            <span className="h-3 w-px bg-line-strong" />
            <span>{Math.ceil(readingTime.minutes)} min read</span>
          </div>
          {summary && <p className="line-clamp-3 text-body text-ink">{summary}</p>}
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
