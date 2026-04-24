'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccess('')
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields.')
      return
    }

    await signup(name.trim(), email.trim(), password)
    setSuccess('Account created and saved locally.')
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#d6dfeb_0%,#eff4fa_100%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
            <UserRound className="h-4 w-4" />
            Create profile account
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">Join the profile network</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">Set up your public identity and start getting discovered.</p>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
            <input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Full name" />
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Email address" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#1572c6] focus:bg-white" placeholder="Password" />

            {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
            {success ? <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" />{success}</p> : null}

            <button disabled={isLoading} className="inline-flex h-12 items-center justify-center rounded-full bg-[#0f5fbe] px-6 text-sm font-semibold text-white transition hover:bg-[#0d4f9f] disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-[#0f5fbe] hover:underline">Sign in</Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
