import { defineField, defineType, type Image} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().assetRequired()
    }),
  ]
})

export interface Footer {
  summary: string
  logo: Image
}
