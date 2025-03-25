export type Keyword = string | number | undefined | null

export const searchKeywords = ({query, keywords}: {query: string; keywords: Keyword[]}): boolean => {
    const q = query.toLowerCase()

    return keywords.some(keyword => {
        if (keyword === undefined || keyword === null) return false
        const k = keyword.toString().toLowerCase()

        // substring match
        if (k.includes(q)) return true

        // acronym match
        const acronym = k
            .split(' ')
            .map(word => word[0])
            .join('')

        if (acronym.includes(q)) return true

        return false
    })
}
