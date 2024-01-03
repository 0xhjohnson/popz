import groq from "groq";
import { sanityClient } from "sanity:client";
import type { Gallery } from "../../../schema/gallery";

export async function getGalleryData(): Promise<Gallery> {
  return sanityClient.fetch(groq`*[_type == 'gallery']{
    title,
    subtitle,
    images[]
  }[0]`)
}
