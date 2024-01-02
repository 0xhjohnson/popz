import { defineField, defineType, type Image} from 'sanity'

export const navBarItem = defineType({
  name: 'navBarItem',
  title: 'Navigation bar item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Relative link',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ]
}) 

export const navBar = defineType({
  name: 'navBar',
  title: 'Navigation bar',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: navBarItem.name }],
        }
      ]
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

type NavBarItem = {
  name: string;
  link: string;
}

export interface NavBar {
  items: NavBarItem[]
  logo: Image
}
