'use client'

import {parseAsArrayOf, parseAsBoolean, parseAsString, useQueryState} from 'nuqs'
import {createContext, useContext, useEffect} from 'react'
import {useDebounceValue} from 'usehooks-ts'

import {type NotionPlace} from '@/model/types'

import {kebabify} from '@/lib/kebab'
import {type NotionSelect} from '@/lib/notion/types'
import {searchKeywords} from '@/lib/search'

type HomeContext = {
    allCity: NotionSelect[]
    allType: NotionSelect[]
    allTags: NotionSelect[]

    adminMode: boolean
    toggleAdminMode: () => void

    query: string
    setQuery: (query: string) => void
    debounceQuery: string

    top: boolean
    toggleTop: () => void

    cityIsSelected: (city: NotionSelect) => boolean
    typeIsSelected: (type: NotionSelect) => boolean
    tagIsSelected: (tag: NotionSelect) => boolean

    selectedCity: NotionSelect[]
    selectedType: NotionSelect[]
    selectedTags: NotionSelect[]

    toggleSelectedCity: (city: NotionSelect) => void
    toggleSelectedType: (type: NotionSelect) => void
    toggleSelectedTag: (tag: NotionSelect) => void

    clearSelectedCity: () => void
    clearSelectedType: () => void
    clearSelectedTags: () => void

    showMap: boolean
    toggleShowMap: () => void

    displayPlace: NotionPlace[]
}

const HomeContext = createContext<HomeContext | null>(null)

export function HomeContextProvider({
    allPlace,
    allCity,
    allType,
    allTags,
    children,
}: {
    allPlace: NotionPlace[]
    allCity: NotionSelect[]
    allType: NotionSelect[]
    allTags: NotionSelect[]
    children?: React.ReactNode
}) {
    const [adminMode, setAdminMode] = useQueryState('admin', parseAsBoolean.withDefault(false))

    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
    const [debounceQuery, setDebounceQuery] = useDebounceValue<string>(query, 200)
    useEffect(() => {
        setDebounceQuery(query)
    }, [query, setDebounceQuery])

    const [top, setTop] = useQueryState('top', parseAsBoolean.withDefault(false))

    const [selectedCityParam, setSelectedCityParam] = useQueryState('city', parseAsArrayOf(parseAsString).withDefault([]))
    const [selectedTypeParam, setSelectedTypeParam] = useQueryState('type', parseAsArrayOf(parseAsString).withDefault([]))
    const [selectedTagsParam, setSelectedTagsParam] = useQueryState('tags', parseAsArrayOf(parseAsString).withDefault([]))

    const cityIsSelected = (city: NotionSelect) => selectedCityParam.includes(kebabify(city.name))
    const typeIsSelected = (type: NotionSelect) => selectedTypeParam.includes(kebabify(type.name))
    const tagIsSelected = (tag: NotionSelect) => selectedTagsParam.includes(kebabify(tag.name))

    const selectedCity = allCity.filter(cityIsSelected)
    const selectedType = allType.filter(typeIsSelected)
    const selectedTags = allTags.filter(tagIsSelected)

    const toggleSelectedCity = (city: NotionSelect) =>
        setSelectedCityParam(cityIsSelected(city) ? selectedCityParam.filter(c => c !== kebabify(city.name)) : [...selectedCityParam, kebabify(city.name)])
    const toggleSelectedType = (type: NotionSelect) =>
        setSelectedTypeParam(typeIsSelected(type) ? selectedTypeParam.filter(t => t !== kebabify(type.name)) : [...selectedTypeParam, kebabify(type.name)])
    const toggleSelectedTag = (tag: NotionSelect) =>
        setSelectedTagsParam(tagIsSelected(tag) ? selectedTagsParam.filter(t => t !== kebabify(tag.name)) : [...selectedTagsParam, kebabify(tag.name)])

    const clearSelectedCity = () => setSelectedCityParam([])
    const clearSelectedType = () => setSelectedTypeParam([])
    const clearSelectedTags = () => setSelectedTagsParam([])

    const [showMap, setShowMap] = useQueryState('map', parseAsBoolean.withDefault(false))
    const toggleShowMap = () => setShowMap(!showMap)

    const displayPlace = allPlace
        .filter(place => (top ? place.top : true))
        .filter(place => (selectedCity.length ? cityIsSelected(place.city) : true))
        .filter(place => (selectedType.length ? place.type.some(typeIsSelected) : true))
        .filter(place => (selectedTags.length ? place.tags.some(tagIsSelected) : true))
        .filter(place =>
            query
                ? searchKeywords({
                      query: debounceQuery,
                      keywords: [place.name, place.city.name, ...place.type.map(({name}) => name), ...place.tags.map(({name}) => name)],
                  })
                : true
        )

    return (
        <HomeContext.Provider
            value={{
                allCity,
                allType,
                allTags,

                adminMode,
                toggleAdminMode: () => setAdminMode(!adminMode),

                query,
                setQuery,
                debounceQuery,

                top,
                toggleTop: () => setTop(!top),

                cityIsSelected,
                typeIsSelected,
                tagIsSelected,

                selectedCity,
                selectedType,
                selectedTags,

                toggleSelectedCity,
                toggleSelectedType,
                toggleSelectedTag,

                clearSelectedCity,
                clearSelectedType,
                clearSelectedTags,

                showMap,
                toggleShowMap,

                displayPlace,
            }}
        >
            {children}
        </HomeContext.Provider>
    )
}

export function useHomeContext() {
    const context = useContext(HomeContext)
    if (!context) throw new Error('useHomeContext must be used within a HomeContextProvider')
    return context
}
