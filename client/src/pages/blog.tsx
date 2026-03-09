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
    <div className="bg-background min-h-screen pt-24 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dent Society Blog",
            description: "Expert insights on hail damage repair, paintless dent repair, insurance claims, and storm damage restoration in Dallas-Fort Worth.",
            url: "https://dentsociety.com/blog",
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">Blog</p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#111111] uppercase tracking-tight leading-[1.05]"
            data-testid="text-blog-headline"
          >
            Insights and Expertise
          </h1>
          <p className="mt-4 text-[#555558] text-lg leading-relaxed">
            Technical knowledge, industry analysis, and storm season guidance from the Dent Society team.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="blog-post-grid">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article
                  className="p-6 rounded-md bg-white border border-black/8 shadow-sm hover-elevate cursor-pointer h-full flex flex-col"
                  data-testid={`card-blog-post-${post.id}`}
                >
                  <p className="text-xs text-[#555558]/60 uppercase tracking-[0.15em] mb-3">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : ""}
                  </p>
                  <h2 className="text-lg font-bold text-[#111111] leading-snug mb-3" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-[#555558] leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.15em] text-[#FF192C]/70 bg-[#FF192C]/5 px-2 py-0.5 rounded"
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
            <p className="text-[#555558]/50 text-sm mb-6">Articles coming soon. Check back for expert insights on hail damage repair and insurance coordination.</p>
            <Link href="/contact?utm_source=website&utm_medium=blog_cta&utm_campaign=blog">
              <Button
                className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-8"
                data-testid="button-blog-cta"
              >
                Start My Repair
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-16 p-6 rounded-md bg-[#F0F0F0] border border-black/10">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#555558] font-semibold mb-4">Explore</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Hail Damage Repair", href: "/hail-damage-repair-dallas" },
              { label: "PDR vs Body Shop", href: "/pdr-vs-body-shop" },
              { label: "Insurance Claims", href: "/insurance-claim-assistance" },
              { label: "Repair Costs", href: "/how-much-does-hail-repair-cost" },
              { label: "Resale Value", href: "/how-hail-affects-resale-value" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-[#FF192C] hover:text-[#FF192C]/80 transition-colors cursor-pointer">
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
