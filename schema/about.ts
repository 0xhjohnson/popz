import { defineField, defineType, type PortableTextBlock } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array', 
      of: [
        { 
          type: 'block' 
        },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [ 
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() }
          ]
        }
      ]
    })
  ]
})

export interface About {
  title: string
  subtitle: string
  content: PortableTextBlock[]
}
