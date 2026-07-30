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
        {/*
          The box is a fixed height only at desktop, where the card is a known
          453px wide. Below that a card is anything from 312px across on a phone
          to 719px on the last screen before the tablet columns split, and one
          fixed height crops a different part of the cover at every one of them.
          So the box takes the 906x400 the covers are cut to and the art arrives
          whole instead.
        */}
        {/* The ratio the covers are cut to. One card spans 312px to 719px below
            the desktop breakpoint, and a fixed height would crop a different
            part of the art at each of those widths.
            The desktop height stays declared rather than left to the ratio: a
            340px card makes the ratio 150.1px against the 150px this resolves
            to, and the tenth of a pixel is a visible difference to a diff. */}
        <div className="relative aspect-[906/400] w-full xl:aspect-auto xl:h-[12.5rem]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1280px) 453px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <h2 className="line-clamp-2 text-title-4 font-medium text-ink md:text-title-3">{title}</h2>
          <div className="flex items-center gap-2 text-body-sm text-ink">
            <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
            <span className="h-3 w-px bg-line-strong" />
            <span>{Math.ceil(readingTime.minutes)} min read</span>
          </div>
          {summary && <p className="line-clamp-3 text-body-sm text-ink md:text-body">{summary}</p>}
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
