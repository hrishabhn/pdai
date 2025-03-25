'use client'

import {useHomeContext} from '../context'

import {City, ForkKnife, List, Plus, Star, Tag, X} from '@phosphor-icons/react'

import {searchKeywords} from '@/lib/search'

import {Badge} from '@/components/ui'

export function HomeInfo() {
    const {top, toggleTop, displayPlace} = useHomeContext()

    return (
        <div className="flex flex-wrap items-center gap-2 py-4">
            <Badge>
                <List weight="bold" />
                {`${displayPlace.length} Place${displayPlace.length === 1 ? '' : 's'}`}
            </Badge>

            {top && (
                <button onClick={() => toggleTop()} className="active:opacity-60">
                    <Badge>
                        <Star weight="fill" />
                        <p>Top</p>
                        <X weight="bold" />
                    </Badge>
                </button>
            )}

            <HomeInfoCity />
            <HomeInfoType />
            <HomeInfoTag />
        </div>
    )
}

function HomeInfoCity() {
    const {allCity, setQuery, debounceQuery, cityIsSelected, selectedCity, toggleSelectedCity} = useHomeContext()

    const suggestedCity = allCity.filter(city => {
        if (cityIsSelected(city)) return false
        if (debounceQuery.length < 3) return false
        return searchKeywords({query: debounceQuery, keywords: [city.name]})
    })

    return (
        <>
            {selectedCity.map(city => (
                <button key={city.id} onClick={() => toggleSelectedCity(city)} className="active:opacity-60">
                    <Badge>
                        <City weight="duotone" />
                        <p>{city.name}</p>
                        <X weight="bold" />
                    </Badge>
                </button>
            ))}

            {suggestedCity.map(city => (
                <button
                    key={city.id}
                    onClick={() => {
                        toggleSelectedCity(city)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <Badge active>
                        <City weight="duotone" />
                        <p>{city.name}</p>
                        <Plus weight="bold" />
                    </Badge>
                </button>
            ))}
        </>
    )
}

function HomeInfoType() {
    const {allType, setQuery, debounceQuery, typeIsSelected, selectedType, toggleSelectedType} = useHomeContext()

    const suggestedType = allType.filter(type => {
        if (typeIsSelected(type)) return false
        if (debounceQuery.length < 3) return false
        return searchKeywords({query: debounceQuery, keywords: [type.name]})
    })

    return (
        <>
            {selectedType.map(type => (
                <button key={type.id} onClick={() => toggleSelectedType(type)} className="active:opacity-60">
                    <Badge>
                        <ForkKnife weight="duotone" />
                        <p>{type.name}</p>
                        <X weight="bold" />
                    </Badge>
                </button>
            ))}

            {suggestedType.map(type => (
                <button
                    key={type.id}
                    onClick={() => {
                        toggleSelectedType(type)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <Badge active>
                        <ForkKnife weight="duotone" />
                        <p>{type.name}</p>
                        <Plus weight="bold" />
                    </Badge>
                </button>
            ))}
        </>
    )
}

function HomeInfoTag() {
    const {allTags, setQuery, debounceQuery, tagIsSelected, selectedTags, toggleSelectedTag} = useHomeContext()

    const suggestedTags = allTags.filter(tag => {
        if (tagIsSelected(tag)) return false
        if (debounceQuery.length < 3) return false
        return searchKeywords({query: debounceQuery, keywords: [tag.name]})
    })

    return (
        <>
            {selectedTags.map(tag => (
                <button key={tag.id} onClick={() => toggleSelectedTag(tag)} className="active:opacity-60">
                    <Badge>
                        <Tag weight="duotone" />
                        <p>{tag.name}</p>
                        <X weight="bold" />
                    </Badge>
                </button>
            ))}

            {suggestedTags.map(tag => (
                <button
                    key={tag.id}
                    onClick={() => {
                        toggleSelectedTag(tag)
                        setQuery('')
                    }}
                    className="active:opacity-60"
                >
                    <Badge active>
                        <Tag weight="duotone" />
                        <p>{tag.name}</p>
                        <Plus weight="bold" />
                    </Badge>
                </button>
            ))}
        </>
    )
}
