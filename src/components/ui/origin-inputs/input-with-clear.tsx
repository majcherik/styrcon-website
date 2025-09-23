"use client"

import { useId, useRef } from "react"
import { CircleXIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithClearProps {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
  required?: boolean
}

export function InputWithClear({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  className,
  error,
  required = false
}: InputWithClearProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearInput = () => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: "" }
      } as React.ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          ref={inputRef}
          className={`pe-9 ${className || ""}`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
        />
        {value && (
          <button
            type="button"
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
            onClick={handleClearInput}
          >
            <CircleXIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      {error && (
        <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}