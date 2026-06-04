import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanity = createClient({
  projectId: "1hjglvj8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(sanity);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── Service ────────────────────────────────────────────────────────────────
// Sanity schema type: "service"
// Required fields: title (string), description (text), tags (array<string>),
//                  number (string, e.g. "01"), order (number), iconName (string)
// iconName options: Compass | MonitorSmartphone | Share2 | PenTool | TrendingUp | BarChart3 | Zap | Globe | Code | Palette | Search
export type SanityService = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  number: string;
  iconName?: string;
};

export async function fetchServices(): Promise<SanityService[]> {
  return sanity.fetch(
    `*[_type == "service"] | order(order asc) { _id, title, description, tags, number, iconName }`
  );
}

// ── Project (Portfolio) ────────────────────────────────────────────────────
// Sanity schema type: "project"
// Required fields: title, category (string), industry (string), tags[], result, year (string),
//                  url (string), image (image), order (number)
// industry options: ecommerce | fintech | realestate | automotive | saas | finance | other
export type SanityProject = {
  _id: string;
  title: string;
  category: string;
  industry: string;
  tags: string[];
  result: string;
  year: string;
  url: string;
  photo?: string;
};

export async function fetchProjects(): Promise<SanityProject[]> {
  return sanity.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, category, industry, tags, result, year, url,
      "photo": image.asset->url
    }`
  );
}

// ── Team Member ────────────────────────────────────────────────────────────
// Sanity schema type: "teamMember"
// Required fields: name (string), role (string), bio (text), image (image), order (number)
export type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export async function fetchTeamMembers(): Promise<SanityTeamMember[]> {
  return sanity.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio,
      "photo": image.asset->url
    }`
  );
}

// ── Blog Post ──────────────────────────────────────────────────────────────
// Sanity schema type: "post"
// Required fields: title, slug (slug), excerpt (text), publishedAt (datetime),
//                  mainImage (image), categories[]->{ title }, body (array/block content)
export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: string;
  categories?: Array<{ title: string }>;
  body?: unknown;
};

export async function fetchBlogPosts(): Promise<SanityPost[]> {
  return sanity.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, "slug": slug.current, excerpt, publishedAt,
      "mainImage": mainImage.asset->url,
      categories[]->{ title }
    }`
  );
}

export async function fetchBlogPost(slug: string): Promise<SanityPost | null> {
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, excerpt, publishedAt,
      "mainImage": mainImage.asset->url,
      categories[]->{ title },
      body
    }`,
    { slug }
  );
}
