import type {MetadataRoute} from 'next';
import {allBlogs} from '.contentlayer/generated';
import siteMetadata from '@/data/siteMetadata';

/**
 * Built at compile time, so a post appears here the moment it is deployed.
 *
 * The fixed pages carry no lastModified: the repository does not record when
 * their copy last changed, and stamping the build date would ask a crawler to
 * revisit them after every unrelated deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/compiler', '/blog'].map((path) => ({
    url: `${siteMetadata.siteUrl}${path}`,
  }));

  const posts = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      lastModified: post.lastmod ?? post.date,
    }));

  return [...pages, ...posts];
}
