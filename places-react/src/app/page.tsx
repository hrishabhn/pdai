import {HomeContextProvider} from './context'
import {HomeFilter} from './views/filter'
import {HomeInfo} from './views/info'
import {HomeMap} from './views/map'
import {HomeStack} from './views/stack'

import {ForkKnife} from '@phosphor-icons/react/dist/ssr'
import {Suspense} from 'react'

import {getAllDropdown, getAllPlace} from '@/model/client'

export default function Home() {
    return (
        <Suspense
            fallback={
                <>
                    <div className="h-8 w-full bg-accent" />
                    <div className="flex flex-col items-center justify-center gap-2 py-36 text-accent">
                        <div className="animate-bounce rounded-full bg-accent p-2">
                            <ForkKnife weight="duotone" className="text-white" size={30} />
                        </div>
                        <p className="text-lg font-medium">Loading...</p>
                    </div>
                </>
            }
        >
            <HomeContent />
        </Suspense>
    )
}

async function HomeContent() {
    const [allPlace, allDropdown] = await Promise.all([getAllPlace(), getAllDropdown()])
    return (
        <HomeContextProvider allPlace={allPlace} {...allDropdown}>
            <HomeFilter />
            <div className="w-full px-4 sm:px-10">
                <HomeInfo />
                <HomeMap />
                <HomeStack />
            </div>
        </HomeContextProvider>
    )
}
