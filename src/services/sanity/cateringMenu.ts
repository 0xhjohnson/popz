import groq from "groq";
import { sanityClient } from "sanity:client";

export async function getCateringMenu(): Promise<CateringMenu> {
  return sanityClient.fetch(groq`*[_type == 'cateringMenu']{
    title,
    subtitle,
    description,
    categories[]->{
      name,
      description,
      subcategories[]->{
        name,
        items[]->{name, description}
      }
    }
  }[0]`)
}

export type CateringMenuItem = {
  name: string
  description: string | null
}

export type CateringMenuSubcategory = {
  name: string
  items: CateringMenuItem[]
}

export type CateringMenuCategory = {
  name: string
  description: string;
  subcategories: CateringMenuSubcategory[]
}

export interface CateringMenu {
  title: string
  subtitle: string
  description: string;
  categories: CateringMenuCategory[]
}
