import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tcsnqtprep.vercel.app";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/tcs`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tcs/coding`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tcs/aptitude`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tcs/exam`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tcs/pyq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/infosys`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/infosys/coding`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/infosys/aptitude`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/infosys/exam`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/infosys/pyq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
