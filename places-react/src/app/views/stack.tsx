'use client'

import {useHomeContext} from '../context'
import {PlaceCard} from './card'

export function HomeStack() {
    const {displayPlace} = useHomeContext()
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 pb-4">
            {displayPlace.map(place => (
                <PlaceCard key={place.id} place={place} />
            ))}
        </div>
    )
}
