/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

type Env = {
  RESEND_API_KEY: string
}
type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime{}
}
