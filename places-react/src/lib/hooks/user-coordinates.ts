'use client'

import {getCoordinates} from '../coordinates'

import {useQuery} from '@tanstack/react-query'

export const useUserCoordinates = () =>
    useQuery({
        queryKey: ['userCoordinates'],
        queryFn: async () => getCoordinates(),
    })
