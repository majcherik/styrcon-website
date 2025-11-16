'use client'

import { useActionState, useState, useOptimistic, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { AnimatedButton } from '@/components/ui/animated-button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Loader2, AlertTriangle, Send } from 'lucide-react'
import { submitContactForm, type FormState } from '@/lib/actions/contact'
import { cn } from '@/lib/utils'
import { useTimeout } from '@/hooks/use-timeout'
import { useSessionStorage } from '@/hooks/use-session-storage'
import { useEventCallback } from '@/hooks/use-event-callback'
import { toast } from 'sonner'

const initialState: FormState = {}

interface OptimisticMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'sending' | 'sent' | 'error'
  timestamp: number
}

interface FormDraft {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  gdprConsent: boolean
  lastSaved: number
}

export function EnhancedContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const [optimisticSubmitted, setOptimisticSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(true)
  const formRef = useRef<HTMLFormElement>(null)

  // Session storage for form draft
  const [formDraft, setFormDraft, clearFormDraft] = useSessionStorage<FormDraft>('contact-form-draft', {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    gdprConsent: false,
    lastSaved: Date.now()
  })

  // Individual form field states
  const [formData, setFormData] = useState({
    name: formDraft.name || '',
    email: formDraft.email || '',
    phone: formDraft.phone || '',
    subject: formDraft.subject || '',
    message: formDraft.message || '',
    gdprConsent: formDraft.gdprConsent || false
  })

  // Optimistic state for immediate feedback
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<OptimisticMessage[], OptimisticMessage>(
    [],
    (state, newMessage) => [...state, newMessage]
  )

  // Enhanced submit handler with optimistic updates
  const handleSubmit = useEventCallback(async (formData: FormData) => {
    const messageData: OptimisticMessage = {
      id: Date.now().toString(),
      name: formData.get('name') as string || '',
      email: formData.get('email') as string || '',
      subject: formData.get('subject') as string || '',
      message: formData.get('message') as string || '',
      status: 'sending',
      timestamp: Date.now()
    }

    // Add optimistic message immediately
    addOptimisticMessage(messageData)
    setOptimisticSubmitted(true)

    // The form action will be called automatically by useActionState
  })

  // Check if form was successfully submitted
  const isSuccess = state?.success && !isPending

  // Reset optimistic state when form submission completes (success or error)
  useEffect(() => {
    if (!isPending && optimisticSubmitted) {
      // Form submission completed, reset optimistic state
      setOptimisticSubmitted(false)
    }
  }, [isPending, optimisticSubmitted])

  // Auto-hide success message after 5 seconds
  useTimeout(() => {
    if (isSuccess && showSuccessMessage) {
      setShowSuccessMessage(false)
    }
  }, isSuccess && showSuccessMessage ? 5000 : null)

  // Save form draft when data changes
  useEffect(() => {
    const saveDraft = () => {
      setFormDraft({
        ...formData,
        lastSaved: Date.now()
      })
    }

    // Only save if there's some content to save
    const hasContent = formData.name || formData.email || formData.phone || formData.subject || formData.message
    if (hasContent) {
      saveDraft()
    }
  }, [formData, setFormDraft])

  // Clear draft when form is successfully submitted
  useEffect(() => {
    if (isSuccess) {
      clearFormDraft()
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        gdprConsent: false
      })
    }
  }, [isSuccess, clearFormDraft])

  // Show toast notifications for success/error
  useEffect(() => {
    if (!isPending && state) {
      if (state.success) {
        toast.success('Správa bola úspešne odoslaná!', {
          description: 'Ďakujeme za váš záujem. Ozveme sa vám v najbližšom čase.',
          duration: 5000,
        })
      } else if (state.error) {
        if (state.rateLimited) {
          const waitMinutes = Math.ceil((state.retryAfter || 900000) / 60000)
          toast.error('Príliš veľa pokusov', {
            description: `Skúste znova za ${waitMinutes} minút.`,
            duration: 7000,
          })
        } else {
          toast.error('Odoslanie zlyhalo', {
            description: state.error || 'Skúste to prosím znova alebo nás kontaktujte telefonicky.',
            duration: 6000,
          })
        }
      }
    }
  }, [isPending, state])

  // Handle form field changes
  const handleFieldChange = useEventCallback((field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  })

  if (isSuccess && !optimisticSubmitted && showSuccessMessage) {
    return (
      <Card className="p-8 text-center w-full min-w-[300px] border-0 shadow-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Správa odoslaná!</h3>
        <p className="text-gray-600 mb-4">
          {state.message}
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => {
              setShowSuccessMessage(false)
              setOptimisticSubmitted(false)
              formRef.current?.reset()
              clearFormDraft()
              setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                gdprConsent: false
              })
            }}
            variant="outline"
            size="sm"
          >
            Odoslať ďalšiu správu
          </Button>

          <p className="text-xs text-slate-500">
            Táto správa sa automaticky skryje za 5 sekúnd
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Optimistic Messages Display */}
      {optimisticMessages.length > 0 && (
        <div className="space-y-3">
          {optimisticMessages.map((msg) => (
            <Card key={msg.id} className="p-4 bg-blue-50 border-0 shadow-sm">
              <div className="flex items-start gap-3">
                {msg.status === 'sending' && (
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin mt-0.5" />
                )}
                {msg.status === 'sent' && (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                {msg.status === 'error' && (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900">
                    {msg.status === 'sending' && 'Odosielanie správy...'}
                    {msg.status === 'sent' && 'Správa úspešne odoslaná'}
                    {msg.status === 'error' && 'Chyba pri odosielaní'}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Od: {msg.name} ({msg.email}) • {msg.subject}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-6 w-full border-0 shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Kontaktujte nás</h2>
          <p className="text-gray-600 text-sm">
            Vyplňte formulár a my sa vám ozveme v najkratšom čase.
          </p>
        </div>

      {/* Error Alert */}
      {state?.error && !isPending && (
        <Alert className="mb-6" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {state.error}
            {state?.rateLimited && (
              <span className="block mt-1 text-xs">
                Pokúste sa znova po uplynutí času.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Progressive Enhancement Form */}
      <form
        ref={formRef}
        action={(formData: FormData) => {
          handleSubmit(formData);
          formAction(formData);
        }}
      >
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="relative block">
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isPending || optimisticSubmitted}
                placeholder=" "
                className={cn(
                  "peer w-full border rounded-md outline-none px-4 py-3 transition-colors duration-300",
                  "focus:border-primary",
                  state?.fieldErrors?.name ? "border-red-500" : "border-[#e5eaf2]"
                )}
                aria-describedby={state?.fieldErrors?.name ? "name-error" : undefined}
              />
              <span className="absolute -top-4 left-2 px-1 text-slate-900 font-semibold text-sm scale-[0.9] peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#777777] peer-placeholder-shown:font-normal peer-placeholder-shown:px-0 peer-focus:-top-4 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-slate-900 peer-focus:font-semibold peer-focus:px-1 transition-all duration-300 pointer-events-none">
                Meno *
              </span>
            </label>
            {state?.fieldErrors?.name && (
              <p id="name-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="relative block">
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isPending || optimisticSubmitted}
                placeholder=" "
                className={cn(
                  "peer w-full border rounded-md outline-none px-4 py-3 transition-colors duration-300",
                  "focus:border-primary",
                  state?.fieldErrors?.email ? "border-red-500" : "border-[#e5eaf2]"
                )}
                aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
              />
              <span className="absolute -top-4 left-2 px-1 text-slate-900 font-semibold text-sm scale-[0.9] peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#777777] peer-placeholder-shown:font-normal peer-placeholder-shown:px-0 peer-focus:-top-4 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-slate-900 peer-focus:font-semibold peer-focus:px-1 transition-all duration-300 pointer-events-none">
                Email *
              </span>
            </label>
            {state?.fieldErrors?.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label className="relative block">
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={isPending || optimisticSubmitted}
                placeholder=" "
                className="peer w-full border border-[#e5eaf2] rounded-md outline-none px-4 py-3 transition-colors duration-300 focus:border-primary"
              />
              <span className="absolute -top-4 left-2 px-1 text-slate-900 font-semibold text-sm scale-[0.9] peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#777777] peer-placeholder-shown:font-normal peer-placeholder-shown:px-0 peer-focus:-top-4 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-slate-900 peer-focus:font-semibold peer-focus:px-1 transition-all duration-300 pointer-events-none">
                Telefón
              </span>
            </label>
          </div>

          {/* Subject Field */}
          <div>
            <label className="relative block">
              <input
                id="subject"
                name="subject"
                type="text"
                required
                disabled={isPending || optimisticSubmitted}
                placeholder=" "
                className={cn(
                  "peer w-full border rounded-md outline-none px-4 py-3 transition-colors duration-300",
                  "focus:border-primary",
                  state?.fieldErrors?.subject ? "border-red-500" : "border-[#e5eaf2]"
                )}
                aria-describedby={state?.fieldErrors?.subject ? "subject-error" : undefined}
              />
              <span className="absolute -top-4 left-2 px-1 text-slate-900 font-semibold text-sm scale-[0.9] peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#777777] peer-placeholder-shown:font-normal peer-placeholder-shown:px-0 peer-focus:-top-4 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-slate-900 peer-focus:font-semibold peer-focus:px-1 transition-all duration-300 pointer-events-none">
                Predmet *
              </span>
            </label>
            {state?.fieldErrors?.subject && (
              <p id="subject-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.subject[0]}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="relative block">
              <textarea
                id="message"
                name="message"
                required
                disabled={isPending || optimisticSubmitted}
                placeholder=" "
                className={cn(
                  "peer w-full min-h-[200px] border rounded-md outline-none px-4 py-3 transition-colors duration-300 resize-y",
                  "focus:border-primary",
                  state?.fieldErrors?.message ? "border-red-500" : "border-[#e5eaf2]"
                )}
                aria-describedby={state?.fieldErrors?.message ? "message-error" : undefined}
              />
              <span className="absolute -top-4 left-2 px-1 text-slate-900 font-semibold text-sm scale-[0.9] peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#777777] peer-placeholder-shown:font-normal peer-placeholder-shown:px-0 peer-focus:-top-4 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-slate-900 peer-focus:font-semibold peer-focus:px-1 transition-all duration-300 pointer-events-none">
                Správa *
              </span>
            </label>
            {state?.fieldErrors?.message && (
              <p id="message-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.message[0]}
              </p>
            )}
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="gdprConsent"
              name="gdprConsent"
              required
              disabled={isPending || optimisticSubmitted}
              className={cn(
                "mt-1",
                state?.fieldErrors?.gdprConsent && "border-red-500"
              )}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="gdprConsent"
                className="text-xs font-normal cursor-pointer"
              >
                Súhlasím so spracovaním osobných údajov za účelom kontaktovania *
              </Label>
              {state?.fieldErrors?.gdprConsent && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.gdprConsent[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {isPending || optimisticSubmitted ? (
            <Button
              type="submit"
              disabled={true}
              className="w-full"
              size="lg"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Odosielam...
            </Button>
          ) : (
            <AnimatedButton
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              icon={<Send className="w-5 h-5" />}
            >
              Odoslať správu
            </AnimatedButton>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Polia označené * sú povinné
        </p>
      </form>
      </Card>
    </div>
  )
}