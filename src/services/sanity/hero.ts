import groq from "groq";
import { sanityClient } from "sanity:client";
import type { HomepageHero } from "../../../schema/hero";

export async function getHomepageHero(): Promise<HomepageHero> {
  return sanityClient.fetch(groq`*[_type == 'hero']{
    title,
    summary,
    primaryCta,
    secondaryCta,
    mainImage
  }[0]`)
}
