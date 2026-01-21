"use client";

import { useEffect, useState } from "react";
import { Calendar, User, ArrowRight } from "react-feather";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface Post {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  link: string;
}

const fetchSubstackFeed = async (substackName: string): Promise<Post[]> => {
  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://pirexcomputers.substack.com/feed`,
    );

    if (!response.ok) throw new Error("Failed to fetch blog feed.");

    const data = await response.json();

    return data.items.map((item: any) => {
      const imageMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      const extractedImage = imageMatch ? imageMatch[1] : null;

      const cleanExcerpt =
        item.description.replace(/(<([^>]+)>)/gi, "").substring(0, 150) + "...";

      return {
        title: item.title,
        excerpt: cleanExcerpt,
        // Set default image immediately if no image found
        image: item.thumbnail || extractedImage || "/default.jpg",
        category: item.categories?.[0] || "Newsletter",
        date: item.pubDate,
        author: item.author || "Substack Author",
        link: item.link,
      };
    });
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    throw error;
  }
};

// Separate component for the image with error handling
const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // Only update state once to prevent infinite loop
    if (!hasError) {
      setHasError(true);
      setImgSrc("/default.jpg");
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-full object-cover"
      onError={handleError}
    />
  );
};

const SubstackBlogGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const SUBSTACK_NAME = "YOUR_SUBSTACK";

  useEffect(() => {
    fetchSubstackFeed(SUBSTACK_NAME)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((e) => {
        setError("Unable to load blog posts. Please try again later.");
        setLoading(false);
      });
  }, []); // Empty dependency array prevents infinite loop

  // if (loading) {
  //   return (
  //     <section className="py-20 px-4 lg:px-8">
  //       <div className="container mx-auto text-center">
  //         <p className="text-lg">Loading blog posts...</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className="py-20 px-4 lg:px-8">
  //       <div className="container mx-auto text-center">
  //         <p className="text-red-500">{error}</p>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="py-10">
        <section className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Latest from Our Blog</h1>
              <p className="text-muted-foreground">
                Insights, stories, and updates from our Substack newsletter
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <article
                  key={idx}
                  className="glass-card overflow-hidden hover:shadow-xl transition-shadow rounded-lg border"
                >
                  <div className="relative h-48 bg-muted">
                    <BlogImage src={post.image} alt={post.title} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold leading-tight hover:text-accent transition-colors">
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="font-light">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span className="font-light">{post.author}</span>
                      </div>
                    </div>

                    <Link
                      href={post.link}
                      className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default SubstackBlogGrid;
