import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white/85 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xl font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}.</p>
          <p className="mt-1 text-sm text-slate-600">Profile-first public identity platform</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/" className="rounded-full border border-slate-200 px-4 py-2 hover:bg-slate-50">Home</Link>
          <Link href="/profile" className="rounded-full border border-slate-200 px-4 py-2 hover:bg-slate-50">Profiles</Link>
          <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 hover:bg-slate-50">Login</Link>
          <Link href="/register" className="rounded-full border border-slate-200 px-4 py-2 hover:bg-slate-50">Register</Link>
        </div>
      </div>
    </footer>
  )
}
