'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  CircleDollarSign,
  Filter,
  LockKeyhole,
  LogOut,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apiList, callGet } from '@/axios/api'

const AUTHORIZED_EMAIL = 'admin@simops.test'
const AUTHORIZED_CODE = 'SIM-ADMIN-2026'

const countries = ['All countries', 'United States', 'United Kingdom', 'Japan', 'Australia', 'Germany', 'France', 'Singapore', 'Brazil']
const durations = ['All durations', '7 days', '15 days', '30 days', '60 days', '90 days']
const quotas = ['All quotas', '1 GB', '3 GB', '5 GB', '10 GB', '20 GB', 'Unlimited']
const countryCodes = ['US', 'GB', 'JP', 'AU', 'DE', 'FR', 'SG', 'BR']

export default function Page() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authError, setAuthError] = useState('')
  const [country, setCountry] = useState('All countries')
  const [duration, setDuration] = useState('All durations')
  const [quota, setQuota] = useState('All quotas')
  const [search, setSearch] = useState('')
  const [plans, setPlans] = useState()
  const [selectedId, setSelectedId] = useState()
  const [price, setPrice] = useState()
  const [savedPrice, setSavedPrice] = useState()
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
  let cancelled = false

  callGet(`${apiList.testing}/`)
    .then((res) => {
      if (cancelled) return
      const items = Array.isArray(res) ? res : res.items
      if (Array.isArray(items) && items.length > 0) {
        setPlans(items)
        setSelectedId(items[0].id)
        setPrice(String(items[0].price))
        setSavedPrice(String(items[0].price))
        console.log(items,'success')
      }
    })
    .catch(() => {
      if (!cancelled) {
        setApiError('Unable to load the live plan catalog.')
      }
    })
    .finally(() => {
      if (!cancelled) {
        setIsLoading(false)
      }
    })

  return () => {
    cancelled = true
  }
}, [])

const selectedPlan =
  plans?.find((plan) => plan.id === selectedId) ?? plans?.[0]


  const filteredPlans = useMemo(() => plans?.filter((plan) => {
    const matchesCountry = country === 'All countries' || plan.country === country
    const matchesDuration = duration === 'All durations' || plan.duration === duration
    const matchesQuota = quota === 'All quotas' || plan.quota === quota
    const matchesSearch = !search || `${plan.id} ${plan.name}`.toLowerCase().includes(search.toLowerCase())
    return matchesCountry && matchesDuration && matchesQuota && matchesSearch
  }), [country, duration, quota, search])

  function selectPlan(plan) {
    setSelectedId(plan.id)
    setPrice(plan.price)
    setSavedPrice(plan.price)
    setIsSaved(false)
  }

  function handleAuthorize(event) {
    event.preventDefault()
    if (email.trim().toLowerCase() !== AUTHORIZED_EMAIL || code !== AUTHORIZED_CODE) {
      setAuthError('That email or authorization code is not recognized.')
      return
    }
    setAuthError('')
    setIsAuthorized(true)
  }

  async function handleSave(event) {
    event.preventDefault()
    const nextPrice = Number(price)
    if (!isAuthorized || !selectedPlan || !Number.isFinite(nextPrice) || nextPrice <= 0) return

    try {
      const updated = await fetchWrapper(`/api/plans/${selectedPlan.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ price: nextPrice }),
      })
      const updatedPlan = updated.item ?? updated
      setPlans((currentPlans) => currentPlans.map((plan) => plan.id === selectedPlan.id ? { ...plan, ...updatedPlan, price: String(updatedPlan.price ?? nextPrice.toFixed(2)) } : plan))
      setSavedPrice(String(updatedPlan.price ?? nextPrice.toFixed(2)))
      setPrice(String(updatedPlan.price ?? nextPrice.toFixed(2)))
      setIsSaved(true)
      window.setTimeout(() => setIsSaved(false), 2400)
    } catch {
      setApiError('Unable to save this price. Please try again.')
    }
  }

  function signOut() {
    setIsAuthorized(false)
    setEmail('')
    setCode('')
    setAuthError('')
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm"><Radio aria-hidden="true" className="size-5" /></div>
            <div><p className="text-sm font-semibold tracking-tight">SIMOPS</p><p className="text-xs text-slate-500">Pricing operations</p></div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500"><span className="hidden sm:inline">Production workspace</span><div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5"><span className="size-2 rounded-full bg-emerald-500" /><span className="text-xs font-medium text-slate-700">Live</span></div></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-8 max-w-3xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900"><Sparkles aria-hidden="true" className="size-3.5" />Restricted pricing control</div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Update SIM pricing</h1><p className="mt-3 text-base leading-7 text-slate-500">Find a plan across the catalog, review its current market price, and publish an update for new purchases.</p></div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-semibold">Plan catalog</h2><p className="mt-1 text-sm text-slate-500">8,000 plans · filter to find the right market offer</p></div><div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 sm:flex"><Filter className="size-3.5" /> {filteredPlans?.length.toLocaleString()} matches</div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <label className="relative sm:col-span-2 xl:col-span-1"><span className="sr-only">Search plans</span><Search className="absolute left-3 top-3 size-4 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plan ID or name" className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10" /></label>
                {[['Country', country, setCountry, countries], ['Duration', duration, setDuration, durations], ['Quota', quota, setQuota, quotas]].map(([label, value, setter, options]) => <label key={label} className="relative"><span className="sr-only">{label}</span><select value={value} onChange={(event) => (setter)(event.target.value)} className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10">{(options).map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400" /></label>)}
              </div>
            </div>

            <div className="overflow-x-auto"><table className="w-full min-w-[660px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-400"><tr><th className="px-6 py-3 font-semibold sm:px-8">Plan</th><th className="px-4 py-3 font-semibold">Market</th><th className="px-4 py-3 font-semibold">Current price</th><th className="px-6 py-3 text-right font-semibold sm:px-8">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredPlans?.slice(0, 8).map((plan) => <tr key={plan.id} className={selectedId === plan.id ? 'bg-amber-50/60' : 'hover:bg-slate-50'}><td className="px-6 py-4 sm:px-8"><button type="button" onClick={() => selectPlan(plan)} className="text-left"><p className="font-semibold text-slate-900">{plan.name}</p><p className="mt-1 text-xs text-slate-500">{plan.id} · {plan.duration} · {plan.quota}</p></button></td><td className="px-4 py-4"><p className="font-medium text-slate-700">{plan.country}</p><span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">{plan.status}</span></td><td className="px-4 py-4 font-semibold">${plan.price}</td><td className="px-6 py-4 text-right sm:px-8"><Button type="button" variant={selectedId === plan.id ? 'default' : 'outline'} size="sm" onClick={() => selectPlan(plan)}>{selectedId === plan.id ? 'Selected' : 'Choose'}</Button></td></tr>)}</tbody></table></div>
            {filteredPlans?.length === 0 && <p className="p-10 text-center text-sm text-slate-500">No plans match these filters.</p>}
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex gap-4 border-b border-slate-100 pb-5"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><CircleDollarSign className="size-6" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Selected plan</p><h2 className="mt-1 font-semibold">{selectedPlan?.name}</h2><p className="mt-1 text-xs text-slate-500">{selectedPlan?.country} · {selectedPlan?.duration} · {selectedPlan?.quota}</p></div></div><form onSubmit={handleSave} className="pt-6"><label htmlFor="sim-price" className="text-sm font-medium">Customer price</label><div className="mt-2 flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-slate-950 focus-within:ring-2 focus-within:ring-slate-950/10"><span className="text-lg text-slate-400">$</span><input id="sim-price" type="number" min="0.01" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} disabled={!isAuthorized} className="w-full bg-transparent px-2 py-3 text-2xl font-semibold outline-none disabled:cursor-not-allowed disabled:text-slate-400" /><span className="text-sm text-slate-400">USD</span></div><p className="mt-2 text-xs text-slate-500">Current price: ${savedPrice} USD</p><Button type="submit" disabled={!isAuthorized || !price || Number(price) <= 0} className="mt-6 h-11 w-full rounded-xl">{isSaved ? <Check data-icon="inline-start" /> : null}{isSaved ? 'Price updated' : 'Save price'}</Button><p className="mt-3 text-center text-xs text-slate-500">Updates apply to new purchases only.</p></form></section>

            <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-7">{isAuthorized ? <div className="flex h-full flex-col"><div className="flex items-center justify-between"><div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><ShieldCheck className="size-6" /></div><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Authorized</span></div><h2 className="mt-6 text-xl font-semibold">Access verified</h2><p className="mt-2 text-sm leading-6 text-slate-400">You can update prices for this catalog.</p><div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-white/10"><UserRound className="size-4 text-slate-300" /></div><div><p className="text-sm font-medium">Operations admin</p><p className="text-xs text-slate-400">{email}</p></div></div></div><button type="button" onClick={signOut} className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white"><LogOut className="size-4" /> Sign out</button></div> : <form onSubmit={handleAuthorize}><div className="flex size-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300"><LockKeyhole className="size-6" /></div><h2 className="mt-6 text-xl font-semibold">Authorization required</h2><p className="mt-2 text-sm leading-6 text-slate-400">Only approved operations admins can change prices.</p><div className="mt-7 flex flex-col gap-4"><label className="text-xs font-medium text-slate-300">Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300" required /></label><label className="text-xs font-medium text-slate-300">Authorization code<input type="password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter access code" className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300" required /></label></div>{authError && <p role="alert" className="mt-4 text-xs text-rose-300">{authError}</p>}<Button type="submit" className="mt-6 h-11 w-full rounded-lg bg-amber-300 font-semibold text-slate-950 hover:bg-amber-200">Verify access <ChevronDown data-icon="inline-end" className="rotate-[-90deg]" /></Button><p className="mt-4 text-center text-[11px] leading-5 text-slate-500">Static demo authorization · connect your identity provider before production.</p></form>}</aside>
          </div>
        </div>
      </div>
    </main>
  )
}
