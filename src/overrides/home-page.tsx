import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const profilePosts = await fetchTaskPosts('profile', 8, { allowMockFallback: true, fresh: true })
  const featuredProfiles = profilePosts.slice(0, 6)
  const highlight = featuredProfiles[0]

  return (
    <div className="min-h-screen bg-[#d6dfeb] text-slate-950">
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(140deg,#0a2f67_5%,#0064aa_45%,#0eb9d8_100%)] px-5 pb-8 pt-5 shadow-[0_26px_90px_rgba(5,24,54,0.42)] sm:px-8 sm:pb-12 sm:pt-6">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <ContentImage src="/placeholder.jpg" alt="Hero background" fill className="object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,33,0.22)_0%,rgba(7,15,33,0.8)_72%,rgba(7,15,33,0.96)_100%)]" />

          <div className="relative z-10 grid gap-8 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                <ShieldCheck className="h-4 w-4" />
                Trusted profile network
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Discover People, Brands, and Public Identities
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-100 sm:text-base">
                {SITE_CONFIG.name} is built for profile discovery. Explore verified creators, businesses, and communities through one clean experience.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/profile" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0c3271] transition hover:bg-slate-100">
                  Explore Profiles
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                  Create Your Profile
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.4rem] border border-white/40 bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                <div className="relative h-44 overflow-hidden rounded-[1rem]">
                  <ContentImage src={highlight ? '/placeholder.jpg' : '/placeholder.svg?height=300&width=500'} alt="Profile highlight" fill className="object-cover" />
                  <button type="button" className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0c3271] shadow-lg">
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-700">Featured profile spotlight</p>
              </div>
            </div>
          </div>

          <p className="pointer-events-none absolute left-8 top-24 z-0 text-[80px] font-semibold tracking-[-0.04em] text-white/20 sm:text-[120px] lg:text-[150px]">
            {SITE_CONFIG.name.toUpperCase()}
          </p>
        </section>

        <section className="rounded-b-[2rem] bg-white px-5 py-10 shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              <UserRound className="h-3.5 w-3.5" />
              Who We Are
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              A profile-first platform built for meaningful identity discovery.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
              We help visitors discover authentic public profiles across creators, teams, brands, and professionals with a clearer and more trusted browsing experience.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['5,000+', 'Active profile pages'],
              ['120+', 'Verified communities'],
              ['24/7', 'Live profile discovery'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-5 py-6">
                <p className="text-2xl font-semibold text-[#115ab3]">{value}</p>
                <p className="mt-1 text-sm text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Profile feed</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">Top Profiles</h3>
            </div>
            <Link href="/profile" className="text-sm font-semibold text-[#0f5fbe] hover:underline">View all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProfiles.map((post) => (
              <TaskPostCard key={post.id} post={post} href={`/profile/${post.slug}`} taskKey="profile" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
