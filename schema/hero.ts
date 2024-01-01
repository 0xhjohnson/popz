import { defineField, defineType, type Image} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'slogan', title: 'Slogan', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'description', title: 'Description', type: 'string', validation: (Rule) => Rule.required() }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'link', title: 'Relative link', type: 'string', validation: (Rule) => Rule.required() }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'link', title: 'Relative link', type: 'string', validation: (Rule) => Rule.required() }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().assetRequired()
    }),
  ]
})

export interface HomepageHero {
  title: {
    slogan: string;
    description: string;
  },
  summary: string;
  primaryCta: {
    text: string;
    link: string;
  },
  secondaryCta: {
    text: string;
    link: string;
  },
  mainImage: Image
}
