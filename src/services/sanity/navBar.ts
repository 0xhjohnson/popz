import groq from "groq";
import { sanityClient } from "sanity:client";
import type { NavBar } from "../../../schema/navBar";

export async function getNavBarData(): Promise<NavBar> {
  return sanityClient.fetch(groq`*[_type == 'navBar']{
    items[]->{name, link},
    logo
  }[0]`)
}
