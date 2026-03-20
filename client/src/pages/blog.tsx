import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", "published"],
    queryFn: () => fetch("/api/posts?status=published").then(r => r.json()),
  });

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Reign Services Blog",
            description: "Expert insights on renovation, custom turf installation, foundation repair, interior and outdoor remodeling across the Dallas-Fort Worth metroplex.",
            url: "https://reignservices.com/blog",
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold mb-4 block">Blog</span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-blog-headline"
          >
            Insights &amp; Expertise
          </h1>
          <p className="mt-4 text-[#B3B3B8] text-lg leading-relaxed">
            Renovation knowledge, project inspiration, and expert guidance from the Reign Services team.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#5D3FD3] animate-spin" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="blog-post-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article
                  className="p-6 rounded-xl cursor-pointer h-full flex flex-col transition-all duration-300 hover:border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-testid={`card-blog-post-${post.id}`}
                >
                  <p className="text-xs text-[#B3B3B8]/50 uppercase tracking-[0.15em] mb-3">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : ""}
                  </p>
                  <h2 className="text-base font-bold text-white leading-snug mb-3" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-[#B3B3B8]/70 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.15em] text-[#5D3FD3]/80 bg-[#5D3FD3]/10 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="blog-empty-state">
            <p className="text-[#B3B3B8]/50 text-sm mb-6">Articles coming soon. Check back for renovation insights, turf installation guides, and DFW project inspiration.</p>
            <Link href="/contact?utm_source=website&utm_medium=blog_cta&utm_campaign=blog">
              <Button
                className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
                data-testid="button-blog-cta"
              >
                Book Free Assessment
              </Button>
            </Link>
          </div>
        )}

        <div
          className="mt-16 p-6 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-4">Our Services</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Custom Turf Install", href: "/custom-turf-install" },
              { label: "Foundation Repair", href: "/foundation-repair" },
              { label: "Interior Remodeling", href: "/interior-remodeling" },
              { label: "Outdoor Remodeling", href: "/outdoor-remodeling" },
              { label: "Outdoor Living", href: "/outdoor-living" },
              { label: "Turf & Pavers", href: "/turf-and-pavers" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-[#5D3FD3] hover:text-[#7a5ce8] transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
