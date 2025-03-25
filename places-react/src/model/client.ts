import 'server-only'

import {database_id} from './config'
import {AllDropdownSchema, NotionPlaceSchema} from './types'

import {Client} from '@notionhq/client'
import {unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag} from 'next/cache'
import {z} from 'zod'

const notion = new Client({auth: process.env.NOTION_API_KEY})

export async function getAllPlace() {
    'use cache'
    cacheTag('notion')
    cacheLife('seconds')

    let next_cursor: string | null | undefined = undefined
    const pages: unknown[] = []

    while (next_cursor !== null) {
        const response = await notion.databases.query({
            database_id,
            sorts: [{property: 'sort_name', direction: 'ascending'}],
            filter: {
                and: [
                    {property: 'public', checkbox: {equals: true}},
                    {property: 'name', title: {is_not_empty: true}},
                    {property: 'city', select: {is_not_empty: true}},
                ],
            },
            start_cursor: next_cursor,
        })

        next_cursor = response.next_cursor
        pages.push(...response.results)
    }

    return z.array(NotionPlaceSchema).parse(pages)
}

export async function getAllDropdown() {
    'use cache'
    cacheTag('notion')
    cacheLife('seconds')

    const {properties} = await notion.databases.retrieve({database_id})
    return AllDropdownSchema.parse(properties)
}
