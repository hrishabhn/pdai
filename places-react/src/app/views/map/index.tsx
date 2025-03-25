'use client'

import dynamic from 'next/dynamic'

export const HomeMap = dynamic(() => import('./content').then(mod => mod.HomeMapContent), {ssr: false})
