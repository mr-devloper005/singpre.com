'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle2, Lock, Mail, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    await login(email.trim(), password)
    setSuccess('Login successful. Your session is saved locally.')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d6dfeb_0%,#eff4fa_100%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[2rem] border border-white/55 bg-[linear-gradient(130deg,#0d366f_6%,#0e75c7_48%,#16b8dc_100%)] p-8 text-white shadow-[0_22px_70px_rgba(13,32,62,0.34)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
              <Sparkles className="h-4 w-4" />
              Welcome back
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Sign in to your profile workspace
            </h1>
            <p className="mt-5 max-w-md text-sm leading-8 text-slate-100">
              Manage your public profile, identity details, highlights, and discovery presence from one place.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-100">
              <p className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3">Profile-first dashboard experience</p>
              <p className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3">Secure local session persistence</p>
              <p className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3">Fast access to your profile pages</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Login</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">{SITE_CONFIG.name} account</h2>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email address
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1572c6] focus:bg-white"
                    placeholder="you@example.com"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Password
                <span className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1572c6] focus:bg-white"
                    placeholder="Enter password"
                  />
                </span>
              </label>

              {error ? (
                <p className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              ) : null}

              {success ? (
                <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {success}
                </p>
              ) : null}

              {isAuthenticated ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  You are already signed in.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-[#0f5fbe] px-6 text-sm font-semibold text-white transition hover:bg-[#0d4f9f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-600">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="font-semibold text-[#0f5fbe] hover:underline">Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
