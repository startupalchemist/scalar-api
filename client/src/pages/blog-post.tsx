import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
  publishedAt: string | null;
  createdAt: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdown(content: string): string {
  const safe = escapeHtml(content);
  return safe
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-[#F5F5F7] mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-[#F5F5F7] mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F5F5F7]">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, '</p><p class="text-[#B3B3B8] leading-relaxed mb-4">')
    .replace(/^/, '<p class="text-[#B3B3B8] leading-relaxed mb-4">')
    .replace(/$/, "</p>");
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ["/api/posts", slug],
    queryFn: () => fetch(`/api/posts/${slug}`).then(r => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),
    enabled: !!slug,
  });

  useEffect(() => {
    if (!post) return;
    document.title = post.seoTitle || `${post.title} | Dent Society`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.content = content;
    };
    const desc = post.seoDescription || post.excerpt || "";
    if (desc) setMeta("description", desc);
    if (post.seoKeywords?.length) setMeta("keywords", post.seoKeywords.join(", "));
    setOg("og:title", post.seoTitle || post.title);
    setOg("og:description", post.excerpt || post.seoDescription || "");
    setOg("og:type", "article");
    setOg("og:url", window.location.href);

    let ldEl = document.querySelector('script[data-blog-ld]') as HTMLScriptElement | null;
    if (!ldEl) { ldEl = document.createElement("script"); ldEl.type = "application/ld+json"; ldEl.setAttribute("data-blog-ld", "true"); document.head.appendChild(ldEl); }
    ldEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || post.seoDescription || "",
      datePublished: post.publishedAt,
      ...(post.seoKeywords?.length ? { keywords: post.seoKeywords.join(", ") } : {}),
      publisher: { "@type": "Organization", name: "Dent Society" },
    });

    return () => {
      document.title = "Dent Society";
      document.querySelector('script[data-blog-ld]')?.remove();
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="bg-[#0B0B0D] min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center py-20">
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-4" data-testid="text-post-not-found">Article Not Found</h1>
          <p className="text-[#B3B3B8] mb-8">This article may have been moved or removed.</p>
          <Link href="/blog">
            <Button className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold" data-testid="button-back-to-blog">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">

      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#B3B3B8] hover:text-[#FF192C] transition-colors cursor-pointer mb-8" data-testid="link-back-to-blog">
            <ArrowLeft className="w-3 h-3" />
            Back to Blog
          </span>
        </Link>

        <div className="mb-10">
          <p className="text-xs text-[#B3B3B8]/60 uppercase tracking-[0.15em] mb-4">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : ""}
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F7] uppercase tracking-tight leading-[1.05]"
            data-testid="text-post-title"
          >
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.15em] text-[#FF192C]/70 bg-[#FF192C]/5 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="prose prose-invert max-w-none"
          data-testid="blog-post-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div className="mt-16 pt-8 border-t border-white/5">
          <Link href="/contact">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-8"
              data-testid="button-post-cta"
            >
              Get a Free Estimate
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
