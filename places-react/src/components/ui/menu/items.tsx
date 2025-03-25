'use client'

import {MenuItems} from '@headlessui/react'

import {type DropdownAnchor, DropdownTransition} from '@/components/ui'

type DropdownMenuProps = {
    anchor?: DropdownAnchor
    children?: React.ReactNode
}

export function DropdownMenuItems({anchor = 'bottom start', children}: DropdownMenuProps) {
    return (
        <DropdownTransition>
            <MenuItems
                anchor={{
                    to: anchor,
                    gap: 8,
                }}
                className="z-50 origin-top rounded-lg bg-layer-1 shadow-md ring-1 ring-line transition"
            >
                <div className="max-h-96 w-64 overflow-y-scroll py-1">{children}</div>
            </MenuItems>
        </DropdownTransition>
    )
}
