import { defineField, defineType, type Image} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'galleryImage',
          title: 'Gallery image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() }
          ],
          validation: (Rule) => Rule.required().assetRequired()
        }
      ]
    })
  ]
})

type ImageWithAlt = Image & { alt: string }

export interface Gallery {
  title: string
  subtitle: string
  images: ImageWithAlt[]
}
