import {z} from 'zod'

// notion meta types
const NotionColorSchema = z.enum(['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'])
export const NotionSelectSchema = z.object({name: z.string(), id: z.string(), color: NotionColorSchema})
const NotionRichTextBlockSchema = z.object({plain_text: z.string()})

export type NotionSelect = z.infer<typeof NotionSelectSchema>
export type NotionColor = z.infer<typeof NotionColorSchema>

// notion properties schema
export const NotionTitleSchema = z.object({title: z.array(NotionRichTextBlockSchema).nonempty()}).transform(value => value.title.map(({plain_text}) => plain_text).join(''))
export const NotionOptionalTitleSchema = z.object({title: z.array(NotionRichTextBlockSchema)}).transform(value => value.title.map(({plain_text}) => plain_text).join('') || null)

export const NotionTimeStampSchema = z.union([
    z.object({created_time: z.string().datetime()}).transform(value => value.created_time),
    z.object({last_edited_time: z.string().datetime()}).transform(value => value.last_edited_time),
])

export const NotionRichTextSchema = z.object({rich_text: z.array(NotionRichTextBlockSchema).nonempty()}).transform(value => value.rich_text.map(({plain_text}) => plain_text).join(''))
export const NotionOptionalRichTextSchema = z.object({rich_text: z.array(NotionRichTextBlockSchema)}).transform(value => value.rich_text.map(({plain_text}) => plain_text).join('') || null)

export const NotionNumberSchema = z.object({number: z.number()}).transform(value => value.number)
export const NotionOptionalNumberSchema = z.object({number: z.number().nullable()}).transform(value => value.number)

export const NotionDateSchema = z.object({date: z.object({start: z.string().date()})}).transform(value => value.date.start)
export const NotionOptionalDateSchema = z.object({date: z.object({start: z.string().date()}).nullable()}).transform(value => value.date?.start || null)

export const NotionUrlSchema = z.object({url: z.string().url()}).transform(value => value.url)
export const NotionOptionalUrlSchema = z.object({url: z.string().url().nullable()}).transform(value => value.url || null)

export const NotionSingleSelectSchema = z.object({select: NotionSelectSchema}).transform(value => value.select)
export const NotionOptionalSingleSelectSchema = z.object({select: NotionSelectSchema.nullable()}).transform(value => value?.select || null)

export const NotionMultiSelectSchema = z.object({multi_select: z.array(NotionSelectSchema)}).transform(value => value.multi_select)

export const NotionStatusSchema = z.object({status: NotionSelectSchema}).transform(value => value.status)
export const NotionOptionalStatusSchema = z.object({status: NotionSelectSchema.nullable()}).transform(value => value.status || null)

export const NotionCheckboxSchema = z.object({checkbox: z.boolean()}).transform(value => value.checkbox)

export const NotionFileSchema = z
    .object({
        files: z
            .array(
                z
                    .discriminatedUnion('type', [
                        z.object({type: z.literal('external'), external: z.object({url: z.string().url()})}),
                        z.object({type: z.literal('file'), file: z.object({url: z.string().url()})}),
                    ])
                    .transform(value => {
                        switch (value.type) {
                            case 'external':
                                return value.external.url
                            case 'file':
                                return value.file.url
                        }
                    })
            )
            .nullable()
            .transform(value => value?.at(0) || null),
    })
    .transform(value => value.files)

export const NotionCoverSchema = z
    .discriminatedUnion('type', [
        z.object({type: z.literal('external'), external: z.object({url: z.string().url()})}),
        z.object({type: z.literal('file'), file: z.object({url: z.string().url()})}),
    ])
    .nullable()
    .transform(value => {
        if (!value) return null
        switch (value.type) {
            case 'external':
                return value.external.url
            case 'file':
                return value.file.url
        }
    })
