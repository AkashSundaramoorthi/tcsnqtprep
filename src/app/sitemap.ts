import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tcsnqtprep.vercel.app";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/coding`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/aptitude`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/exam`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pyq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
