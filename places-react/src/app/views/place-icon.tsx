'use client'

import {BeerStein, BookOpen, Coffee, DiscoBall, ForkKnife, IceCream, type Icon, MapPin, Tree} from '@phosphor-icons/react'

function getPlaceIcon(placeType: string | undefined): Icon {
    switch (placeType) {
        // food
        case 'Restaurant':
        case 'Food Hall/Market':
            return ForkKnife

        // drink
        case 'Bar':
        case 'Nightlife/Bar Area':
            return BeerStein

        // coffee
        case 'Coffee Shop':
            return Coffee

        // book
        case 'Book Shop':
            return BookOpen

        // club
        case 'Club':
            return DiscoBall

        // dessert
        case 'Dessert':
            return IceCream

        // park
        case 'Park':
            return Tree

        // default
        default:
            return MapPin
    }
}

export function PlaceIcon({placeType}: {placeType: string | undefined}) {
    const Icon = getPlaceIcon(placeType)

    return (
        <div className="flex aspect-video items-center justify-center bg-accent/20">
            <Icon size={24} weight="bold" />
        </div>
    )
}
