import groq from "groq";
import { sanityClient } from "sanity:client";
import type { Footer } from "../../../schema/footer";

export async function getFooterData(): Promise<Footer> {
  return sanityClient.fetch(groq`*[_type == 'footer']{
    summary,
    logo
  }[0]`)
}
