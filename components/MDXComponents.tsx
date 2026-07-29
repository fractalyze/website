import Image from 'next/image';
import Link from 'next/link';

const CustomLink = (props: any) => {
  const href: string = props.href ?? '';

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
    return <Link href={href} {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CustomImage = (props: any) => {
  return <Image alt={props.alt || ''} {...props} />;
};

const MDXComponents = {
  Image: CustomImage,
  a: CustomLink,
};

export default MDXComponents;
