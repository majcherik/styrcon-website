import { useId } from "react"
import { MailIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithIconProps {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
  icon?: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>
  required?: boolean
}

export function InputWithIcon({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  error,
  icon: Icon = MailIcon,
  required = false
}: InputWithIconProps) {
  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          className={`peer pe-9 ${className || ""}`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <Icon size={16} aria-hidden="true" />
        </div>
      </div>
      {error && (
        <p className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}