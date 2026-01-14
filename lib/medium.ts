export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    // Simulate network delay to "mimic loading"
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@brytebee",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}
