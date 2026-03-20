export interface MediaKitData {
  name: string;
  handle: string;
  niche: string;
  bio: string;
  location: string;
  profilePhoto: string | null;
  followers: string;
  engagementRate: string;
  reach: string;
  contentTypes: string[];
  brands: string;
  email: string;
}

export type TemplateId = "clean" | "bold" | "vibrant";
