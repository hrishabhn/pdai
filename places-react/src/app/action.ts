'use server'

import {revalidateTag} from 'next/cache'

export const revalidateNotion = async () => revalidateTag('notion')
