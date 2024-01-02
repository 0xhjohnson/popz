import groq from 'groq';
import { sanityClient } from 'sanity:client';
import type { About } from '../../../schema/about';

export async function getAboutPageData(): Promise<About> {
  return sanityClient.fetch(groq`*[_type == 'about']{
    title,
    subtitle,
    content
  }[0]`)
}
