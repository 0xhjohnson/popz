import type { CateringMenu } from './services/sanity/cateringMenu';
import type { MenuSection } from 'schema-dts';

export function generateTitle(pageTitle: string) {
  return `${pageTitle} | Pop'z BBQ & Catering`
}

export function stripTrailingSlash(str: string) {
  return str.endsWith('/') ?
        str.slice(0, -1) :
        str;
}

export function buildSeoMenuSection(cateringMenu: CateringMenu) {
  return cateringMenu.categories.reduce<MenuSection[]>((acc, category) => {
    const seoMenuItems = []
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        seoMenuItems.push({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description
        })
      }
    }
  
    acc.push({
      '@type': 'MenuSection',
      name: category.name,
      description: category.description,
      hasMenuItem: seoMenuItems
    })
  
    return acc
  }, [])
}
