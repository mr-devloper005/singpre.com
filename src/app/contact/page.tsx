import Link from 'next/link'
import { Clock3, Mail, MapPin, MessageSquareText, Phone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const contactLanes = [
    {
      icon: MessageSquareText,
      title: 'General Support',
      body: 'Need help with your profile page, account access, or updates? Our support lane is always open.',
    },
    {
      icon: Sparkles,
      title: 'Partnerships',
      body: 'For creator programs, brand profile campaigns, and identity collaboration opportunities.',
    },
    {
      icon: MapPin,
      title: 'Regional Requests',
      body: 'Request profile coverage improvements for your city, community, or category.',
    },
  ]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d6dfeb_0%,#eff4fa_100%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-white/55 bg-[linear-gradient(130deg,#0d366f_6%,#0e75c7_48%,#16b8dc_100%)] p-8 text-white shadow-[0_22px_70px_rgba(13,32,62,0.34)]">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                <Mail className="h-4 w-4" />
                Contact {SITE_CONFIG.name}
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Let’s talk about your profile presence.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-100">
                Reach out for support, partnerships, or growth requests. We respond with clear next steps, quickly.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm">
                  <Clock3 className="mb-1 h-4 w-4" />
                  Typical response in 24 hours
                </div>
                <div className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm">
                  <Phone className="mb-1 h-4 w-4" />
                  Priority partner support available
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {contactLanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.1)]">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">Send a message</h2>
            <p className="mt-2 text-sm text-slate-600">Tell us what you need and we will route your request to the right team.</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-[#1572c6] focus:bg-white" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#0f5fbe] px-6 text-sm font-semibold text-white transition hover:bg-[#0d4f9f]">
                Send message
              </button>
            </form>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Direct contact</p>
              <p className="mt-1 inline-flex items-center gap-2"><Mail className="h-4 w-4" /> support@{SITE_CONFIG.domain}</p>
              <p className="mt-1 inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 410-2042</p>
              <p className="mt-3">
                Need profile updates now? <Link href="/profile" className="font-semibold text-[#0f5fbe] hover:underline">Browse profiles</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
