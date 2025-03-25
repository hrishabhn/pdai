import {type NotionColor} from './types'

import {type CardTheme} from '@/components/ui'

export function notionColorToTheme(color: NotionColor): CardTheme {
    switch (color) {
        case 'default':
        case 'gray':
            return 'g'
        case 'brown':
            return 'lime'
        default:
            return color
    }
}
