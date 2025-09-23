import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RequiredInputProps {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
}

export function RequiredInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  error
}: RequiredInputProps) {
  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        required
        aria-invalid={!!error}
      />
      {error && (
        <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}