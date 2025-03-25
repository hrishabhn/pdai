'use client'

import {type Icon, MagnifyingGlass} from '@phosphor-icons/react'
import {useEffect, useState} from 'react'

type FilterItemProps = {
    active?: boolean
    children?: React.ReactNode
}

export function FilterItem({active = false, children}: FilterItemProps) {
    return (
        <div className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium ${active ? 'bg-white text-accent' : 'bg-white/5 text-white hover:hover:bg-white/10'}`}>
            {children}
        </div>
    )
}

type FilterIconProps = {
    active?: boolean
    icon: Icon
}

export function FilterIcon({active = false, icon}: FilterIconProps) {
    const Icon = icon
    return (
        <div className={`rounded-lg p-1 ${active ? 'bg-white text-accent' : 'bg-white/5 text-white hover:hover:bg-white/10'}`}>
            <Icon weight="bold" size={18} />
        </div>
    )
}

// search
export function FilterSearch({value, setValue}: {value: string; setValue: (value: string) => void}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (value) setIsOpen(true)
    }, [value])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault()
                setIsOpen(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (!isOpen)
        return (
            <button onClick={() => setIsOpen(true)} className="active:opacity-60">
                <FilterIcon icon={MagnifyingGlass} />
            </button>
        )

    return (
        <FilterItem active={true}>
            <MagnifyingGlass weight="bold" className="opacity-60" />
            <input
                type="search"
                autoFocus
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={() => {
                    if (value === '') setIsOpen(false)
                }}
                placeholder="Filter"
                className="bg-transparent outline-none"
            />
        </FilterItem>
    )
}
