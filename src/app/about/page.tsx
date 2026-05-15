import Link from "next/link";
import { Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const pillars = [
  {
    title: "Identity First",
    body: "Every profile surface is designed to show real people, brands, and public trust signals clearly.",
    icon: Users,
  },
  {
    title: "Trust by Design",
    body: "Verification cues, clean structure, and transparent profile information make discovery safer.",
    icon: ShieldCheck,
  },
  {
    title: "Faster Discovery",
    body: "Visitors can move quickly from one relevant profile to another with less noise and more context.",
    icon: Compass,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d6dfeb_0%,#eff4fa_100%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-white/55 bg-[linear-gradient(130deg,#0d366f_6%,#0e75c7_48%,#16b8dc_100%)] p-8 text-white shadow-[0_22px_70px_rgba(13,32,62,0.34)]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            <Sparkles className="h-4 w-4" />
            About {SITE_CONFIG.name}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Building the web’s cleaner home for public profiles.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-100 sm:text-base">
            {SITE_CONFIG.name} helps people discover creators, professionals, teams, and brands through identity-focused pages that prioritize trust and clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20">
              Contact Us
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-[1.4rem] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
              <item.icon className="h-6 w-6 text-[#0f5fbe]" />
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
