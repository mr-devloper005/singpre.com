import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { ArrowLeft, Globe, Sparkles } from "lucide-react";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedProfiles = (await fetchTaskPosts("profile", 8)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d6dfeb_0%,#eff4fa_100%)]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/55 bg-[linear-gradient(130deg,#0d366f_6%,#0e75c7_48%,#16b8dc_100%)] p-7 text-white shadow-[0_22px_70px_rgba(13,32,62,0.34)] sm:p-8">
          <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
            Back to Profiles
          </Link>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="h-4 w-4" />
            Profile detail
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{brandName}</h1>
          {domain ? <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-100"><Globe className="h-4 w-4" />{domain}</p> : null}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.08)] md:p-12">
          <div className="grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {logoUrl ? (
                  <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="144px" intrinsicWidth={144} intrinsicHeight={144} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-500">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{brandName}</h2>
              {domain ? (
                <p className="mt-1 text-sm font-medium text-muted-foreground">{domain}</p>
              ) : null}
              <article
                className="article-content prose prose-slate mt-6 max-w-2xl text-base leading-relaxed prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
              {website ? (
                <div className="mt-8">
                  <Button asChild size="lg" className="rounded-full bg-[#0f5fbe] px-7 text-base hover:bg-[#0d4f9f]">
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {suggestedProfiles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">More profiles</h2>
              <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedProfiles.map((profile) => (
                <TaskPostCard
                  key={profile.id}
                  post={profile}
                  href={`/profile/${profile.slug}`}
                  taskKey="profile"
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-foreground">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedProfiles.map((profile) => (
                  <li key={`related-${profile.id}`}>
                    <Link
                      href={`/profile/${profile.slug}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {profile.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
