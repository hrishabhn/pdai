'use client'

import {type Icon} from '@phosphor-icons/react'

import {notionColorToTheme} from '@/lib/notion/color'
import {type NotionSelect} from '@/lib/notion/types'

import {DropdownDivider, DropdownMenuItem, DropdownMenuItems, FilterItem, Menu, MenuButton} from '@/components/ui'

type HomeFilterItemProps<T> = {
    allItem: T[]
    icon: Icon
    placeholder: string
    itemIsSelected: (item: T) => boolean
    selectedItem: T[]
    toggleSelectedItem: (item: T) => void
    clearSelectedItem: () => void
}

export function HomeFilterItem({allItem, icon, placeholder, itemIsSelected, selectedItem, toggleSelectedItem, clearSelectedItem}: HomeFilterItemProps<NotionSelect>) {
    const Icon = icon
    return (
        <Menu>
            <MenuButton className="active:opacity-60">
                <FilterItem active={selectedItem.length > 0}>
                    <Icon weight="duotone" className="shrink-0" />
                    <p className="line-clamp-1">{placeholder}</p>
                </FilterItem>
            </MenuButton>
            <DropdownMenuItems>
                <DropdownMenuItem action={{onClick: () => clearSelectedItem()}} title="Show All" active={selectedItem.length === 0} />
                {selectedItem.length > 0 && (
                    <>
                        <DropdownDivider />
                        {selectedItem.map(item => (
                            <DropdownMenuItem
                                key={item.id}
                                action={{onClick: () => toggleSelectedItem(item)}}
                                image={{theme: notionColorToTheme(item.color)}}
                                title={item.name}
                                active
                            />
                        ))}
                    </>
                )}

                <DropdownDivider />
                {allItem
                    .filter(item => !itemIsSelected(item))
                    .map(item => (
                        <DropdownMenuItem
                            key={item.id}
                            action={{onClick: () => toggleSelectedItem(item)}}
                            image={{theme: notionColorToTheme(item.color)}}
                            title={item.name}
                            active={itemIsSelected(item)}
                        />
                    ))}
            </DropdownMenuItems>
        </Menu>
    )
}
