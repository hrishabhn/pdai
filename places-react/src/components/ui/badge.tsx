import {type Rounded, getRoundedClass} from './model'

import {tw} from '@/lib/tailwind'

type BadgeSize = 'sm' | 'md'

type BadgeProps = {
    children?: React.ReactNode
    size?: BadgeSize
    rounded?: Rounded

    active?: boolean
}

export const Badge = ({children, size = 'md', rounded = 'full', active = false}: BadgeProps) => {
    const sizeClass = {
        sm: tw`text-xs`,
        md: tw`text-sm`,
    }[size]

    const themeClass = active ? tw`border-transparent bg-accent text-white` : tw`border-accent/80 bg-accent/10 text-accent`
    const roundedClass = getRoundedClass(rounded)

    return <div className={`flex shrink-0 items-center gap-1 rounded-full border-2 px-2 py-1 font-bold text-nowrap ${sizeClass} ${themeClass} ${roundedClass}`}>{children}</div>
}
