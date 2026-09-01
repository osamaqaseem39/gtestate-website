'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type DarkSelectProps = {
  name: string
  options: string[]
  placeholder?: string
  required?: boolean
}

const triggerClass =
  'flex w-full items-center justify-between gap-2 border border-white/15 bg-white/5 px-3 py-2.5 text-left text-sm text-white focus:border-[#fabb22] focus:outline-none'

export default function DarkSelect({
  name,
  options,
  placeholder = 'Select',
  required,
}: DarkSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-required={required || undefined}
      >
        <span className={value ? 'text-white' : 'text-white/30'}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/50 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto border border-white/15 bg-zinc-900 shadow-2xl"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => {
                setValue(option)
                setOpen(false)
              }}
              className={`cursor-pointer px-3 py-2.5 text-sm transition-colors hover:bg-[#fabb22]/20 ${
                value === option ? 'bg-[#fabb22]/10 text-[#fabb22]' : 'text-white'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
