'use client'

import {DivIcon} from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, Tooltip} from 'react-leaflet'
import {useMediaQuery} from 'usehooks-ts'

import {type NotionPlace} from '@/model/types'

import {useUserCoordinates} from '@/lib/hooks'
import {tw} from '@/lib/tailwind'

// type and assertion
type MapNotionPlace = NotionPlace & {lat: number; lon: number}
const isMapNotionPlace = (place: NotionPlace): place is MapNotionPlace => place.lat !== null && place.lon !== null

export function MapView({allPlace}: {allPlace: NotionPlace[]}) {
    const isDark = useMediaQuery('(prefers-color-scheme: dark)')
    const {data: userCoordinates} = useUserCoordinates()
    const displayPlace: MapNotionPlace[] = allPlace.filter(isMapNotionPlace)

    const avgLat = displayPlace.map(({lat}) => lat).reduce((a, b) => a + b, 0) / displayPlace.length
    const avgLon = displayPlace.map(({lon}) => lon).reduce((a, b) => a + b, 0) / displayPlace.length

    return (
        <MapContainer
            className="z-0 size-full"
            zoomControl={false}
            center={[avgLat, avgLon]}
            minZoom={2}
            bounds={displayPlace.map(({lat, lon}) => [lat, lon])}
            boundsOptions={{padding: [50, 50]}}
        >
            <TileLayer url={`https://tiles.stadiamaps.com/tiles/alidade_smooth${isDark ? '_dark' : ''}/{z}/{x}/{y}{r}.png`} />

            {displayPlace.map(place => (
                <Marker key={place.id} icon={customIcon('accent')} position={[place.lat, place.lon]}>
                    <Tooltip>{place.name}</Tooltip>
                </Marker>
            ))}

            {userCoordinates && (
                <Marker icon={customIcon('blue')} zIndexOffset={1} position={[userCoordinates.latitude, userCoordinates.longitude]}>
                    <Tooltip>Your Location</Tooltip>
                </Marker>
            )}
        </MapContainer>
    )
}

function customIcon(theme: 'accent' | 'blue') {
    const themeClass = {
        accent: tw`bg-accent`,
        blue: tw`bg-blue-500`,
    }[theme]

    return new DivIcon({className: tw`rounded-full border border-g-800 dark:border-g-200 ${themeClass}`})
}
