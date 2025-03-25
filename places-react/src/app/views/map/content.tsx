'use client'

import {useHomeContext} from '../../context'

import {Card} from '@/components/ui'
import {MapView} from '@/components/views/map'

export function HomeMapContent() {
    const {showMap, displayPlace} = useHomeContext()
    if (!showMap) return null

    return (
        <>
            <Card ring rounded="lg">
                <div className="aspect-square max-h-96 w-full sm:aspect-video">
                    <MapView allPlace={displayPlace} />
                </div>
            </Card>
            <div className="h-4" />
        </>
    )
}
