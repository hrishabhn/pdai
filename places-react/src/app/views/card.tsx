'use client'

import {useHomeContext} from '../context'
import {PlaceIcon} from './place-icon'

import {Circle, GoogleLogo, type Icon, MagnifyingGlass, MapPin, Pencil, Star} from '@phosphor-icons/react'
import Link from 'next/link'
import {Fragment} from 'react'

import {type NotionPlace} from '@/model/types'
import {googleMapsUrl} from '@/model/util'

import {Heading, robotoSlab} from '@/components/layout'
import {Badge, Card, SimpleImage} from '@/components/ui'

export function PlaceCard({place}: {place: NotionPlace}) {
    const info = [...place.type.map(({name}) => name), ...place.tags.map(({name}) => name)]
    const {adminMode} = useHomeContext()

    return (
        <Card rounded="md" ring shadow="sm">
            {place.image ? (
                <Card aspect="video">
                    <SimpleImage url={place.image} alt="maps" />
                </Card>
            ) : (
                <PlaceIcon placeType={place.type.at(0)?.name} />
            )}

            <div className="h-px w-full bg-line" />

            <div className="flex flex-col items-start gap-1 py-3">
                <Heading size="h3" withoutPadding>
                    <p className="line-clamp-2 px-4">{place.name}</p>
                </Heading>

                <div className="flex flex-wrap items-center gap-1.5 px-4 text-xs font-medium">
                    {place.top && (
                        <>
                            <Star weight="fill" className="text-yellow-400" />
                            <p>Top</p>
                            <Circle weight="fill" size={5} className="opacity-60" />
                        </>
                    )}

                    <MapPin weight="bold" className="opacity-60" />
                    <p>{place.city.name}</p>

                    {info.map(tag => (
                        <Fragment key={tag}>
                            <Circle weight="fill" size={5} className="opacity-60" />
                            <p className="opacity-60">{tag}</p>
                        </Fragment>
                    ))}
                </div>
                <div className="flex w-full flex-wrap gap-2 px-4 py-2">
                    <ExternalLink url={googleMapsUrl(place)} icon={MapPin} title="Open in Maps" />
                    <ExternalLink url={place.url} icon={Pencil} title="Edit" />

                    {adminMode && (
                        <>
                            <ExternalLink url={`https://www.google.com/search?q=${encodeURIComponent(place.name)}`} icon={GoogleLogo} title="Google Search" />
                            <ExternalLink url={`https://www.google.com/images?q=${encodeURIComponent(place.name)}`} icon={GoogleLogo} title="Google Images" />
                            <ExternalLink url={`https://www.bing.com/images/search?q=${encodeURIComponent(place.name)}`} icon={MagnifyingGlass} title="Bing Images" />
                        </>
                    )}
                </div>
                {place.description && (
                    <>
                        <div className="my-1 h-px w-full bg-line" />
                        <p className={`${robotoSlab.className} px-4 text-sm font-semibold opacity-60`}>{place.description}</p>
                    </>
                )}
            </div>
        </Card>
    )
}

function ExternalLink({url, icon, title}: {url: string; icon: Icon; title: string}) {
    const Icon = icon
    return (
        <Link href={url} target="_blank" className="active:opacity-60">
            <Badge size="sm" rounded="xl">
                <Icon weight="bold" />
                <p>{title}</p>
            </Badge>
        </Link>
    )
}
