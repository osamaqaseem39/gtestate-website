'use client'

import { useState } from 'react'
import DarkSelect from '@/components/DarkSelect'
import { submitLoanApplication } from '@/lib/api-public'

const PROPERTY_TYPES = ['Plot', 'Townhouse', 'Home', 'Apartment']

/** The PM Loan Scheme form collects exactly these fields; the API rejects submissions missing any of them. */
const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full name',
  fatherOrHusbandName: 'Father / husband name',
  cnicNumber: 'CNIC number',
  monthlyIncome: 'Monthly income',
  residentialAddress: 'Residential address',
  propertyType: 'Property type interest',
  requiredLoanAmount: 'Required loan amount',
  profession: 'Profession',
}

function Field({
  label,
  children,
  className,
  asGroup,
}: {
  label: string
  children: React.ReactNode
  className?: string
  /** Use for custom controls (DarkSelect): a <label> would forward option clicks back to its trigger button. */
  asGroup?: boolean
}) {
  const Wrapper = asGroup ? 'div' : 'label'
  return (
    <Wrapper className={`block space-y-1.5 ${className ?? ''}`}>
      <span className="block text-xs uppercase tracking-wider text-white/60">{label} *</span>
      {children}
    </Wrapper>
  )
}

const inputClass =
  'w-full bg-white/5 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#fabb22] focus:outline-none'

export default function PmLoanSchemeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [formKey, setFormKey] = useState(0)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, string> = {}
    for (const key of Object.keys(FIELD_LABELS)) {
      payload[key] = String(fd.get(key) ?? '').trim()
    }
    const missing = Object.keys(FIELD_LABELS).find((key) => !payload[key])
    if (missing) {
      setStatus('error')
      setError(`Please fill in: ${FIELD_LABELS[missing]}.`)
      return
    }
    if (!/^\d{5}-?\d{7}-?\d$/.test(payload.cnicNumber)) {
      setStatus('error')
      setError('Please enter a valid 13-digit CNIC number (e.g. 35202-1234567-1).')
      return
    }

    setStatus('loading')
    const result = await submitLoanApplication(payload)
    if (result.ok) {
      setStatus('success')
      setFormKey((k) => k + 1)
    } else {
      setStatus('error')
      setError(result.error || 'Submission failed')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[#fabb22]/40 bg-[#fabb22]/10 p-8 text-center">
        <p className="text-lg font-semibold text-white mb-2">Application submitted</p>
        <p className="text-white/70 text-sm">Our team will contact you shortly.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm text-[#fabb22] underline">
          Submit another application
        </button>
      </div>
    )
  }

  return (
    <form key={formKey} onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={FIELD_LABELS.fullName}>
          <input name="fullName" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label={FIELD_LABELS.fatherOrHusbandName}>
          <input name="fatherOrHusbandName" required className={inputClass} />
        </Field>
        <Field label={FIELD_LABELS.cnicNumber}>
          <input name="cnicNumber" required inputMode="numeric" maxLength={15} className={inputClass} placeholder="35202-1234567-1" />
        </Field>
        <Field label={FIELD_LABELS.profession}>
          <input name="profession" required className={inputClass} placeholder="e.g. Teacher, Business owner" />
        </Field>
        <Field label={FIELD_LABELS.monthlyIncome}>
          <input name="monthlyIncome" required className={inputClass} placeholder="PKR" />
        </Field>
        <Field label={FIELD_LABELS.requiredLoanAmount}>
          <input name="requiredLoanAmount" required className={inputClass} placeholder="PKR" />
        </Field>
        <Field label={FIELD_LABELS.propertyType} asGroup>
          <DarkSelect name="propertyType" options={PROPERTY_TYPES} required />
        </Field>
        <Field label={FIELD_LABELS.residentialAddress} className="md:col-span-2">
          <input name="residentialAddress" required autoComplete="street-address" className={inputClass} />
        </Field>
      </div>

      {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto px-8 py-4 bg-[#fabb22] text-black font-semibold uppercase tracking-wider text-sm hover:bg-[#fabb22]/90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}
