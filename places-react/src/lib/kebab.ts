import slugify from 'slugify'

export const kebabify = (str: string) => slugify(str, {lower: true})
