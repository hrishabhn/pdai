'use client'

import {Check} from '@phosphor-icons/react'

import {type Label, LabelImage} from '@/components/ui'

export type DropdownItemProps = Label & {
    active?: boolean
    focus?: boolean
    disabled?: boolean
}

export function DropdownItem({image, title, subtitle, active = false, focus = false, disabled = false}: DropdownItemProps) {
    return (
        <div
            className={`mx-1 flex items-center gap-2 rounded-md px-2 py-1.5 active:opacity-60 ${active || focus ? 'bg-black/5 dark:bg-white/5' : ''} ${disabled ? 'text-g-500' : ''}`}
        >
            {image && <LabelImage image={image} size="sm" />}
            <p className="line-clamp-2 text-left text-sm font-medium">{title}</p>
            <div className="grow" />
            {active ? <Check weight="bold" size={12} /> : null}
            {subtitle ? <p className="text-xs font-medium opacity-60">{subtitle}</p> : null}
        </div>
    )
}
