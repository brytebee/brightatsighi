import { getMediumPosts } from "@/lib/medium";
import BlogCards from "./BlogCards";

export default async function BlogList() {
  const posts = await getMediumPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Unable to load stories at the moment.
      </div>
    );
  }

  // Limit to 3 or 6 latest
  const latestPosts = posts.slice(0, 3);

  return <BlogCards posts={latestPosts} />;
}
