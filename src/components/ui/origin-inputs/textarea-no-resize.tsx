import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextareaNoResizeProps {
  label: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
  error?: string
  required?: boolean
}

export function TextareaNoResize({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  className,
  error,
  required = false
}: TextareaNoResizeProps) {
  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea
        id={id}
        className={`[resize:none] ${className || ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
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