'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const links = [
  { label: 'Home', href: '/' },
  { label: 'Profiles', href: '/profile' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-[rgba(7,30,67,0.72)] text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-4xl font-semibold tracking-[-0.03em]">
          {SITE_CONFIG.name}.
        </Link>

        <div className="hidden items-center rounded-full border border-white/25 bg-white/10 p-1 md:flex">
          {links.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active
                  ? 'rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0c2f69]'
                  : 'rounded-full px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/15'}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <>
              <Button variant="ghost" asChild className="rounded-full text-white hover:bg-white/10 hover:text-white">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full border border-white/50 bg-white/10 text-white hover:bg-white/20">
                <Link href="/register" className="inline-flex items-center gap-1.5">
                  Join Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" onClick={() => setIsOpen((value) => !value)} className="rounded-full text-white hover:bg-white/10 hover:text-white md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/15 bg-[rgba(6,25,56,0.95)] px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {links.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={active
                    ? 'rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0c2f69]'
                    : 'rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-medium text-white'}
                >
                  {item.label}
                </Link>
              )
            })}
            {!isAuthenticated ? (
              <Link href="/login" onClick={() => setIsOpen(false)} className="mt-2 rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold text-white">
                Sign In
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
