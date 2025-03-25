import {type NotionPlace} from './types'

export function googleMapsUrl(place: NotionPlace): string {
    const url = new URL('https://www.google.com/maps/search/')
    url.searchParams.append('api', '1')
    url.searchParams.append('query', `${place.name} ${place.city.name}`)
    if (place.maps_id) url.searchParams.append('query_place_id', place.maps_id)
    return url.toString()
}
