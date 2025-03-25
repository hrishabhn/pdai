import './globals.css'
import {Providers} from './providers'

import type {Metadata, Viewport} from 'next'
import colors from 'tailwindcss/colors'

import {karla, robotoSlab} from '@/components/layout'

const title = 'Travel Guide'
const description = 'A curated list of the best places that I have encountered on my travels.'

export const metadata: Metadata = {
    title,
    description,
    robots: {index: false},
}

export const viewport: Viewport = {
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: colors.red[800]},
        {media: '(prefers-color-scheme: dark)', color: colors.red[700]},
    ],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Providers>
                <body className={`${karla.className} flex min-h-screen w-full flex-col bg-layer-0 text-black antialiased dark:text-white`}>
                    <div className={`${robotoSlab.className} bg-accent px-4 pt-8 text-white sm:px-10`}>
                        <p className="text-2xl font-semibold">{title}</p>
                        <p className="text-sm font-medium opacity-60">{description}</p>
                    </div>
                    {children}
                </body>
            </Providers>
        </html>
    )
}
