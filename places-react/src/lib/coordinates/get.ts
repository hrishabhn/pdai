import {type Coordinates, CoordinatesSchema} from './schema'

export async function getCoordinates(): Promise<Coordinates | null> {
    if (!('geolocation' in navigator)) return null
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(CoordinatesSchema.parse(position.coords)),
            error => reject(new Error(`Error Code: ${error.code} - ${error.message}`))
        )
    })
}
