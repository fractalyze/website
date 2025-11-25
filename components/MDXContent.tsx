'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import MDXComponents from './MDXComponents'

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return <Component components={MDXComponents} />
}
