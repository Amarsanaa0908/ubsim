'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
import { apiList, callGet, callPatch } from '@/axios/api'
import countriesData from '@/lib/countries.json'

const AUTHORIZED_EMAIL = 'admin@simops.test'
const AUTHORIZED_CODE = 'SIM-ADMIN-2026'

// Discount field is not in the sample response yet. Change this key once the backend has it.
const DISCOUNT_KEY = 'discountPrice'

const countryOptions = [
  { label: 'All countries', value: 'ALL', searchTerms: [] },
  ...countriesData.countries,
]

const durationOptions = [
  { label: 'Бүх хоног', value: 'ALL' },
  { label: '3 days', value: '3' },
  { label: '5 days', value: '5' },
  { label: '7 days', value: '7' },
  { label: '10 days', value: '10' },
  { label: '15 days', value: '15' },
  { label: '30 days', value: '30' },
  { label: '60 days', value: '60' },
  { label: '90 days', value: '90' },
]

const quotaOptions = [
  { label: 'Бүх дата', value: 'ALL' },
  { label: '1 GB', value: '1' },
  { label: '3 GB', value: '3' },
  { label: '5 GB', value: '5' },
  { label: '10 GB', value: '10' },
  { label: '20 GB', value: '20' },
  { label: 'Unlimited', value: 'UNLIMITED' },
]

const typeOptions = [
  { label: 'Бүх сим', value: 'ALL' },
  { label: 'eSIM', value: 'ESIM' },
  { label: 'Биет', value: 'PHYSICAL' },
]

// Explicit locale so server and client render the same string (avoids hydration mismatch)
const numberFormatter = new Intl.NumberFormat('en-US')
const formatMnt = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? `${numberFormatter.format(n)} MNT` : '—'
}

const isUnlimited = (plan) => plan.name?.toLowerCase().includes('unlimited')

const daysLabel = (plan) => (plan.isDaily ? 'Daily' : `${plan.day} days`)

const quotaLabel = (plan) => {
  if (isUnlimited(plan)) return 'Unlimited'
  if (plan.gb > 0) return `${plan.gb} GB`
  return '—'
}

const hasDiscount = (plan) => {
  const d = Number(plan[DISCOUNT_KEY])
  return plan[DISCOUNT_KEY] != null && Number.isFinite(d) && d > 0 && d < Number(plan.price)
}

// Net price = what the customer actually pays: discounted price if set, otherwise current price
const getNetPrice = (plan) => (hasDiscount(plan) ? Number(plan[DISCOUNT_KEY]) : Number(plan.price))

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400" />
    </label>
  )
}

function CountryCombobox({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase() === q ||
        o.searchTerms?.some((t) => t.toLowerCase().includes(q))
    )
  }, [options, query])

  function choose(option) {
    onChange(option.value)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative">
      <span className="sr-only">Country</span>
      <input
        value={open ? query : selected?.label ?? ''}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        placeholder="Search country"
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
      />
      <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400" />

      {open && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-slate-500">No country found</li>
          )}
          {filtered.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => choose(option)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  option.value === value ? 'bg-amber-50 font-medium' : ''
                }`}
              >
                {option.label}
                {option.value === value && <Check className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Page() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authError, setAuthError] = useState('')

  const [duration, setDuration] = useState('ALL')
  const [quota, setQuota] = useState('ALL')
  const [type, setType] = useState('ALL')
  const [country, setCountry] = useState('ALL')
  const [search, setSearch] = useState('')

  const [plans, setPlans] = useState()
  const [selectedId, setSelectedId] = useState()
  const [price, setPrice] = useState('')
  const [savedPrice, setSavedPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [savedDiscount, setSavedDiscount] = useState('')

  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  function applyPlan(plan) {
    setSelectedId(plan.id)
    setPrice(String(plan.price))
    setSavedPrice(String(plan.price))
    const d = plan[DISCOUNT_KEY]
    setDiscount(d == null ? '' : String(d))
    setSavedDiscount(d == null ? '' : String(d))
    setIsSaved(false)
  }

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setApiError('')

    const query =
      country === 'ALL'
        ? ''
        : `?filters=${encodeURIComponent(JSON.stringify(['slug', country]))}`

    callGet(`${apiList.testing}/${query}`)
      .then((res) => {
        if (cancelled) return
        const items = Array.isArray(res) ? res : res?.items ?? []
        setPlans(items)
        if (items.length > 0) {
          applyPlan(items[0])
        } else {
          setSelectedId(undefined)
          setPrice('')
          setSavedPrice('')
          setDiscount('')
          setSavedDiscount('')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPlans([])
          setApiError('Unable to load the live plan catalog.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [country])

  const filteredPlans = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (plans ?? []).filter((plan) => {
      const matchesDuration = duration === 'ALL' || String(plan.day) === duration
      const matchesQuota =
        quota === 'ALL' ||
        (quota === 'UNLIMITED' ? isUnlimited(plan) : String(plan.gb) === quota)
      const matchesType =
        type === 'ALL' ||
        (type === 'PHYSICAL' ? plan.isPhysical === true : plan.isPhysical === false)
      const matchesSearch = !q || `${plan.id} ${plan.name}`.toLowerCase().includes(q)
      return matchesDuration && matchesQuota && matchesType && matchesSearch
    })
  }, [plans, duration, quota, type, search])

  const selectedPlan = plans?.find((plan) => plan.id === selectedId) ?? plans?.[0]

  function selectPlan(plan) {
    applyPlan(plan)
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
    const discountRaw = discount.trim()
    const nextDiscount = discountRaw === '' ? null : Number(discountRaw)

    if (!isAuthorized || !selectedPlan) return
    if (!Number.isFinite(nextPrice) || nextPrice <= 0) return
    if (
      nextDiscount !== null &&
      (!Number.isFinite(nextDiscount) || nextDiscount <= 0 || nextDiscount >= nextPrice)
    ) {
      setApiError('Discounted price must be greater than 0 and lower than the customer price.')
      return
    }

    setIsSaving(true)
    setApiError('')

    try {
      const res = await callPatch(`${apiList.ubsim}/update`, {
        id: selectedPlan.id,
        price: nextPrice,
        [DISCOUNT_KEY]: nextDiscount,
      })

      if (res?.status !== true) throw new Error('Update failed')

      setPlans((current) =>
        current.map((plan) =>
          plan.id === selectedPlan.id
            ? { ...plan, price: String(nextPrice), [DISCOUNT_KEY]: nextDiscount }
            : plan
        )
      )
      setSavedPrice(String(nextPrice))
      setPrice(String(nextPrice))
      setSavedDiscount(nextDiscount === null ? '' : String(nextDiscount))
      setDiscount(nextDiscount === null ? '' : String(nextDiscount))
      setIsSaved(true)
      window.setTimeout(() => setIsSaved(false), 2400)
    } catch {
      setApiError('Unable to save this price. Please try again.')
    } finally {
      setIsSaving(false)
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
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <Radio aria-hidden="true" className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">SIMOPS</p>
              <p className="text-xs text-slate-500">Pricing operations</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hidden sm:inline">Production workspace</span>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-700">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Restricted pricing control
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Update SIM pricing</h1>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Find a plan across the catalog, review its current market price, and publish an update for new purchases.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Plan catalog</h2>
                  <p className="mt-1 text-sm text-slate-500">Filter to find the right market offer</p>
                </div>
                <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 sm:flex">
                  <Filter className="size-3.5" /> {filteredPlans.length.toLocaleString('en-US')} matches
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <label className="relative sm:col-span-2 xl:col-span-1">
                  <span className="sr-only">Search plans</span>
                  <Search className="absolute left-3 top-3 size-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search plan ID or name"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  />
                </label>
                <CountryCombobox value={country} onChange={setCountry} options={countryOptions} />
                <SelectField label="Days" value={duration} onChange={setDuration} options={durationOptions} />
                <SelectField label="Quota" value={quota} onChange={setQuota} options={quotaOptions} />
                <SelectField label="Type" value={type} onChange={setType} options={typeOptions} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-400">
                  <tr>
                    <th className="px-6 py-3 font-semibold sm:px-8">Plan</th>
                    <th className="px-4 py-3 font-semibold">Market</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Current price</th>
                    <th className="px-4 py-3 font-semibold">Discounted price</th>
                    <th className="px-4 py-3 font-semibold">Net price</th>
                    <th className="px-6 py-3 text-right font-semibold sm:px-8">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPlans.map((plan) => {
                    const isSelected = selectedId === plan.id
                    const discounted = hasDiscount(plan)
                    return (
                      <tr key={plan.id} className={isSelected ? 'bg-amber-50/60' : 'hover:bg-slate-50'}>
                        <td className="px-6 py-4 sm:px-8">
                          <button type="button" onClick={() => selectPlan(plan)} className="text-left">
                            <p className="font-semibold text-slate-900">{plan.name}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {plan.id} · {daysLabel(plan)} · {quotaLabel(plan)}
                            </p>
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-700">{plan.country}</p>
                          {plan.type && (
                            <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                              {plan.type}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              plan.isPhysical ? 'bg-orange-50 text-orange-700' : 'bg-sky-50 text-sky-700'
                            }`}
                          >
                            {plan.isPhysical ? 'Биет' : 'eSIM'}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold">{formatMnt(plan.price)}</td>
                        <td className="px-4 py-4">
                          {discounted ? (
                            <span className="font-semibold text-rose-600">{formatMnt(plan[DISCOUNT_KEY])}</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-emerald-700">{formatMnt((plan.netPrice))}</span>
                          {/* {discounted && (
                            <p className="text-xs text-slate-400 line-through">{formatMnt(plan.netPrice)}</p>
                          )} */}
                        </td>
                        <td className="px-6 py-4 text-right sm:px-8">
                          <Button
                            type="button"
                            variant={isSelected ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => selectPlan(plan)}
                          >
                            {isSelected ? 'Сонгосон' : 'Сонгох'}
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {filteredPlans.length === 0 && (
              <p className="p-10 text-center text-sm text-slate-500">No plans match these filters.</p>
            )}
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex gap-4 border-b border-slate-100 pb-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <CircleDollarSign className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Selected plan</p>
                  <h2 className="mt-1 font-semibold">{selectedPlan?.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPlan?.country} · {selectedPlan && daysLabel(selectedPlan)} ·{' '}
                    {selectedPlan && quotaLabel(selectedPlan)} · {selectedPlan?.isPhysical ? 'Physical' : 'eSIM'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="pt-6">
                <label htmlFor="sim-price" className="text-sm font-medium">Customer price</label>
                <div className="mt-2 flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-slate-950 focus-within:ring-2 focus-within:ring-slate-950/10">
                  <span className="text-lg text-slate-400">₮</span>
                  <input
                    id="sim-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={!isAuthorized}
                    className="w-full bg-transparent px-2 py-3 text-2xl font-semibold outline-none disabled:cursor-not-allowed disabled:text-slate-400"
                  />
                  <span className="text-sm text-slate-400">MNT</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Одоогийн үнэ: {formatMnt(savedPrice)}
                </p>

                <label htmlFor="sim-discount" className="mt-5 block text-sm font-medium">
                  Discounted price <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="mt-2 flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-slate-950 focus-within:ring-2 focus-within:ring-slate-950/10">
                  <span className="text-lg text-slate-400">₮</span>
                  <input
                    id="sim-discount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    disabled={!isAuthorized}
                    placeholder="—"
                    className="w-full bg-transparent px-2 py-3 text-lg font-semibold outline-none placeholder:text-slate-300 disabled:cursor-not-allowed disabled:text-slate-400"
                  />
                  <span className="text-sm text-slate-400">MNT</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Одоогийн хямдрал: {savedDiscount ? formatMnt(savedDiscount) : 'Байхгүй'}
                </p>

                {apiError && <p role="alert" className="mt-3 text-xs text-rose-600">{apiError}</p>}

                <Button
                  type="submit"
                  disabled={!isAuthorized || isSaving || !price || Number(price) <= 0}
                  className="mt-6 h-11 w-full rounded-xl"
                >
                  {isSaved ? <Check data-icon="inline-start" /> : null}
                  {isSaving ? 'Saving…' : isSaved ? 'Price updated' : 'Save price'}
                </Button>
                <p className="mt-3 text-center text-xs text-slate-500">Updates apply to new purchases only.</p>
              </form>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-7">
              {isAuthorized ? (
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                      <ShieldCheck className="size-6" />
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Authorized</span>
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">Access verified</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">You can update prices for this catalog.</p>
                  <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-white/10">
                        <UserRound className="size-4 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Operations admin</p>
                        <p className="text-xs text-slate-400">{email}</p>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={signOut} className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white">
                    <LogOut className="size-4" /> Sign out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAuthorize}>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                    <LockKeyhole className="size-6" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">Authorization required</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Only approved operations admins can change prices.</p>
                  <div className="mt-7 flex flex-col gap-4">
                    <label className="text-xs font-medium text-slate-300">
                      Admin email
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300"
                        required
                      />
                    </label>
                    <label className="text-xs font-medium text-slate-300">
                      Authorization code
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter access code"
                        className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300"
                        required
                      />
                    </label>
                  </div>
                  {authError && <p role="alert" className="mt-4 text-xs text-rose-300">{authError}</p>}
                  <Button type="submit" className="mt-6 h-11 w-full rounded-lg bg-amber-300 font-semibold text-slate-950 hover:bg-amber-200">
                    Verify access <ChevronDown data-icon="inline-end" className="rotate-[-90deg]" />
                  </Button>
                  <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
                    Static demo authorization · connect your identity provider before production.
                  </p>
                </form>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}