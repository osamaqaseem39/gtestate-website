'use client'

import { useState } from 'react'
import { submitLoanApplication } from '@/lib/api-public'

const APPLICANT_TYPES = ['Salaried Person', 'Self-Employed / Business', 'Informal Income', 'Overseas Pakistani']
const CNIC_STATUS = ['Pakistani CNIC', 'NICOP']
const MARITAL = ['Single', 'Married', 'Divorced', 'Widowed']
const GENDER = ['Male', 'Female', 'Other']
const EMPLOYMENT = ['Salaried', 'Business Owner', 'Self-Employed', 'Freelancer', 'Informal Income', 'Retired', 'Other']
const INCOME_RANGES = ['Below PKR 50,000', 'PKR 50,000–100,000', 'PKR 100,001–150,000', 'PKR 150,001–250,000', 'PKR 250,001–500,000', 'Above PKR 500,000']
const PURPOSE = ['Purchase of House', 'Purchase of Flat / Apartment', 'Construction on Owned Plot', 'Purchase of Plot + Construction']
const PROPERTY_TYPES = ['House', 'Flat / Apartment', 'Plot']
const PROPERTY_STATUS = ['Ready / Completed', 'Under Construction', 'To Be Constructed']
const OWNERSHIP = ['Already Owned', 'To Be Purchased']
const SIZE = ['Up to 5 Marla', '6–10 Marla', 'Other']
const LOAN_AMOUNTS = ['Up to PKR 1 Million', 'PKR 1–2 Million', 'PKR 2–3 Million', 'PKR 3–3.5 Million', 'Other / Enter Amount']
const TENURE = ['5 Years', '10 Years', '15 Years', '20 Years']
const HOME_OWNERSHIP = ["No, I don't own a house", 'Yes, I own a house']
const BANKS = ['HBL', 'UBL', 'MCB', 'Meezan Bank', 'Bank Alfalah', 'Bank of Punjab', 'NBP', 'Faysal Bank', 'Askari Bank', 'HBFCL', 'Other']
const CITIES = ['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Faisalabad', 'Gujranwala', 'Multan', 'Peshawar', 'Quetta', 'Other']

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-white/60">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full bg-white/5 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#fabb22] focus:outline-none'

const selectClass = `${inputClass} appearance-none`

export default function PmLoanSchemeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, string> = {}
    fd.forEach((v, k) => {
      payload[k] = String(v)
    })
    const result = await submitLoanApplication(payload)
    if (result.ok) {
      setStatus('success')
      e.currentTarget.reset()
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
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Applicant type" required>
          <select name="applicantType" required className={selectClass}>
            <option value="">Select</option>
            {APPLICANT_TYPES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="CNIC status">
          <select name="cnicStatus" className={selectClass}>
            <option value="">Select</option>
            {CNIC_STATUS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Marital status">
          <select name="maritalStatus" className={selectClass}>
            <option value="">Select</option>
            {MARITAL.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Gender">
          <select name="gender" className={selectClass}>
            <option value="">Select</option>
            {GENDER.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Employment status">
          <select name="employmentStatus" className={selectClass}>
            <option value="">Select</option>
            {EMPLOYMENT.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Monthly income range">
          <select name="monthlyIncomeRange" className={selectClass}>
            <option value="">Select</option>
            {INCOME_RANGES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Purpose of financing">
          <select name="purposeOfFinancing" className={selectClass}>
            <option value="">Select</option>
            {PURPOSE.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Property type">
          <select name="propertyType" className={selectClass}>
            <option value="">Select</option>
            {PROPERTY_TYPES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Property status">
          <select name="propertyStatus" className={selectClass}>
            <option value="">Select</option>
            {PROPERTY_STATUS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Property ownership">
          <select name="propertyOwnership" className={selectClass}>
            <option value="">Select</option>
            {OWNERSHIP.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Property size">
          <select name="propertySize" className={selectClass}>
            <option value="">Select</option>
            {SIZE.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Required loan amount">
          <select name="requiredLoanAmount" className={selectClass}>
            <option value="">Select</option>
            {LOAN_AMOUNTS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Custom loan amount (if Other)">
          <input name="requiredLoanAmountCustom" className={inputClass} placeholder="PKR amount" />
        </Field>
        <Field label="Preferred loan tenure">
          <select name="preferredLoanTenure" className={selectClass}>
            <option value="">Select</option>
            {TENURE.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Current home ownership">
          <select name="currentHomeOwnership" className={selectClass}>
            <option value="">Select</option>
            {HOME_OWNERSHIP.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred bank">
          <select name="preferredBank" className={selectClass}>
            <option value="">Select</option>
            {BANKS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="City">
          <select name="city" className={selectClass}>
            <option value="">Select</option>
            {CITIES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#fabb22] mb-5">Personal details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Full name" required>
            <input name="fullName" required className={inputClass} />
          </Field>
          <Field label="Father / husband name">
            <input name="fatherOrHusbandName" className={inputClass} />
          </Field>
          <Field label="CNIC number">
            <input name="cnicNumber" className={inputClass} placeholder="35202-1234567-1" />
          </Field>
          <Field label="Date of birth">
            <input name="dateOfBirth" type="date" className={inputClass} />
          </Field>
          <Field label="Mobile number" required>
            <input name="mobileNumber" required className={inputClass} placeholder="+92 300 1234567" />
          </Field>
          <Field label="Email">
            <input name="email" type="email" className={inputClass} />
          </Field>
          <Field label="Current address">
            <input name="currentAddress" className={inputClass} />
          </Field>
          <Field label="Permanent address">
            <input name="permanentAddress" className={inputClass} />
          </Field>
          <Field label="Province">
            <input name="province" className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#fabb22] mb-5">Financial details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Monthly gross income">
            <input name="monthlyGrossIncome" className={inputClass} />
          </Field>
          <Field label="Monthly net income">
            <input name="monthlyNetIncome" className={inputClass} />
          </Field>
          <Field label="Existing monthly loan installments">
            <input name="existingMonthlyLoanInstallments" className={inputClass} />
          </Field>
          <Field label="Monthly rent">
            <input name="monthlyRent" className={inputClass} />
          </Field>
          <Field label="Other income">
            <input name="otherIncome" className={inputClass} />
          </Field>
          <Field label="Employment / business name">
            <input name="employmentOrBusinessName" className={inputClass} />
          </Field>
          <Field label="Years in current employment / business">
            <input name="yearsInEmploymentOrBusiness" className={inputClass} />
          </Field>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

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
