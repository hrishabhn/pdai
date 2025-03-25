'use client'

import {useHomeContext} from '../../context'
import {HomeFilterItem} from './item'
import {HomeFilterMenu} from './menu'
import './style.css'

import {City, ForkKnife, MagnifyingGlass, MapPinArea, Star, Tag, X} from '@phosphor-icons/react'
import {motion} from 'motion/react'
import {useRef} from 'react'
import {useKey} from 'react-use'

import {useSticky} from '@/lib/hooks'

import {FilterIcon, FilterItem} from '@/components/ui'

export function HomeFilter() {
    const {isStuck, ref} = useSticky()

    const transition = {duration: 0.1}

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={{
                paddingInline: isStuck ? '1rem' : 'var(--px)',
            }}
            transition={transition}
            className="sticky top-0 z-10 grid grid-cols-1 gap-2 bg-accent py-4 sm:grid-cols-[1fr_auto]"
        >
            <div className="flex w-full items-center gap-2">
                <HomeFilterTop />
                <HomeFilterCity />
                <HomeFilterType />
                <HomeFilterTag />
                <div className="grow" />
                <HomeFilterMap />
                <HomeFilterMenu />
            </div>

            <HomeFilterSearch />
        </motion.div>
    )
}

function HomeFilterTop() {
    const {top, toggleTop} = useHomeContext()

    return (
        <button onClick={toggleTop} className="active:opacity-60">
            <FilterItem active={top}>
                <Star weight="fill" className="shrink-0" />
                <p className="line-clamp-1">Top</p>
            </FilterItem>
        </button>
    )
}

function HomeFilterCity() {
    const {allCity, cityIsSelected, selectedCity, toggleSelectedCity, clearSelectedCity} = useHomeContext()

    return (
        <HomeFilterItem
            allItem={allCity}
            icon={City}
            placeholder="City"
            itemIsSelected={cityIsSelected}
            selectedItem={selectedCity}
            toggleSelectedItem={toggleSelectedCity}
            clearSelectedItem={clearSelectedCity}
        />
    )
}

function HomeFilterType() {
    const {allType, typeIsSelected, selectedType, toggleSelectedType, clearSelectedType} = useHomeContext()

    return (
        <HomeFilterItem
            allItem={allType}
            icon={ForkKnife}
            placeholder="Type"
            itemIsSelected={typeIsSelected}
            selectedItem={selectedType}
            toggleSelectedItem={toggleSelectedType}
            clearSelectedItem={clearSelectedType}
        />
    )
}

function HomeFilterTag() {
    const {allTags, tagIsSelected, selectedTags, toggleSelectedTag, clearSelectedTags} = useHomeContext()

    return (
        <HomeFilterItem
            allItem={allTags}
            icon={Tag}
            placeholder="Tags"
            itemIsSelected={tagIsSelected}
            selectedItem={selectedTags}
            toggleSelectedItem={toggleSelectedTag}
            clearSelectedItem={clearSelectedTags}
        />
    )
}

function HomeFilterMap() {
    const {showMap, toggleShowMap} = useHomeContext()

    return (
        <button onClick={() => toggleShowMap()} className="active:opacity-60">
            <FilterIcon icon={MapPinArea} active={showMap} />
        </button>
    )
}

function HomeFilterSearch() {
    const ref = useRef<HTMLInputElement>(null)
    useKey('/', e => {
        if (document.activeElement !== ref.current) {
            e.preventDefault()
            ref.current?.focus()
        }
    })

    const {query, setQuery} = useHomeContext()

    return (
        <div className="flex w-full items-center gap-2 rounded-lg bg-white/5 px-2 text-base font-medium text-white sm:text-sm">
            <MagnifyingGlass weight="bold" className="shrink-0" />
            <input
                ref={ref}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search"
                className="grow bg-transparent py-1 outline-none placeholder:text-white/50"
            />
            <button onClick={() => setQuery('')} className="active:opacity-60">
                <X weight="bold" className="shrink-0" />
            </button>
        </div>
    )
}
