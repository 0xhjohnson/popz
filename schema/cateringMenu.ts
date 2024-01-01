import { defineField, defineType} from 'sanity'

export const cateringMenuItem = defineType({
  name: 'cateringMenuItem',
  title: 'Catering menu item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string'
    })
  ]
})

export const cateringMenuSubcategory = defineType({
  name: 'cateringMenuSubcategory',
  title: 'Catering menu subcategory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: cateringMenuItem.name }],
        }
      ]
    })
  ]
})

export const cateringMenuCategory = defineType({
  name: 'cateringMenuCategory',
  title: 'Catering menu category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: cateringMenuSubcategory.name }],
        }
      ]
    })
  ]
})

export const cateringMenu = defineType({
  name: 'cateringMenu',
  title: 'Catering menu',
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
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: cateringMenuCategory.name }],
        }
      ]
    })
  ]
})
