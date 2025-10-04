'use client'

import { useActionState, useState, useOptimistic, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Loader2, AlertTriangle, Send } from 'lucide-react'
import { submitContactForm, type FormState } from '@/lib/actions/contact'
import { cn } from '@/lib/utils'
import { useTimeout } from '@/hooks/use-timeout'
import { useSessionStorage } from '@/hooks/use-session-storage'

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
  subject: string
  message: string
  company?: string
  gdprConsent: boolean
  lastSaved: number
}

export function EnhancedContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const [optimisticSubmitted, setOptimisticSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(true)

  // Session storage for form draft
  const [formDraft, setFormDraft, clearFormDraft] = useSessionStorage<FormDraft>('contact-form-draft', {
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    gdprConsent: false,
    lastSaved: Date.now()
  })

  // Individual form field states
  const [formData, setFormData] = useState({
    name: formDraft.name || '',
    email: formDraft.email || '',
    subject: formDraft.subject || '',
    message: formDraft.message || '',
    company: formDraft.company || '',
    gdprConsent: formDraft.gdprConsent || false
  })

  // Optimistic state for immediate feedback
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<OptimisticMessage[], OptimisticMessage>(
    [],
    (state, newMessage) => [...state, newMessage]
  )

  // Enhanced submit handler with optimistic updates
  const handleSubmit = useCallback(async (formData: FormData) => {
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
  }, [addOptimisticMessage])

  // Check if form was successfully submitted
  const isSuccess = state?.success && !isPending

  // Auto-hide success message after 5 seconds
  useTimeout(() => {
    if (isSuccess && showSuccessMessage) {
      setShowSuccessMessage(false)
    }
  }, isSuccess && showSuccessMessage ? 5000 : null)

  // Reset success message visibility when form is successfully submitted
  useEffect(() => {
    if (isSuccess && !showSuccessMessage) {
      setShowSuccessMessage(true)
    }
  }, [isSuccess, showSuccessMessage])

  // Save form draft when data changes
  useEffect(() => {
    const saveDraft = () => {
      setFormDraft({
        ...formData,
        lastSaved: Date.now()
      })
    }

    // Only save if there's some content to save
    const hasContent = formData.name || formData.email || formData.subject || formData.message || formData.company
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
        subject: '',
        message: '',
        company: '',
        gdprConsent: false
      })
    }
  }, [isSuccess, clearFormDraft])

  // Handle form field changes
  const handleFieldChange = useCallback((field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  if (isSuccess && !optimisticSubmitted && showSuccessMessage) {
    return (
      <Card className="p-8 text-center w-full max-w-lg">
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
              setOptimisticSubmitted(false)
              setShowSuccessMessage(true)
              // Reset form could be implemented here
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
            <Card key={msg.id} className="p-4 bg-blue-50 border-blue-200">
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

      <Card className="p-6 w-full">
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
        action={(formData: FormData) => {
          handleSubmit(formData);
          formAction(formData);
        }}
      >
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Meno *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              disabled={isPending || optimisticSubmitted}
              className={cn(
                "mt-1",
                state?.fieldErrors?.name && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="Vaše meno"
              aria-describedby={state?.fieldErrors?.name ? "name-error" : undefined}
            />
            {state?.fieldErrors?.name && (
              <p id="name-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={isPending || optimisticSubmitted}
              className={cn(
                "mt-1",
                state?.fieldErrors?.email && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="vas.email@example.com"
              aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
            />
            {state?.fieldErrors?.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefón
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              disabled={isPending || optimisticSubmitted}
              className="mt-1"
              placeholder="+421 xxx xxx xxx"
            />
          </div>

          {/* Company Field (Optional) */}
          <div>
            <Label htmlFor="company" className="text-sm font-medium">
              Spoločnosť
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              disabled={isPending || optimisticSubmitted}
              className="mt-1"
              placeholder="Názov spoločnosti"
            />
          </div>

          {/* Subject Field */}
          <div>
            <Label htmlFor="subject" className="text-sm font-medium">
              Predmet *
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              disabled={isPending || optimisticSubmitted}
              className={cn(
                "mt-1",
                state?.fieldErrors?.subject && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="Predmet vašej správy"
              aria-describedby={state?.fieldErrors?.subject ? "subject-error" : undefined}
            />
            {state?.fieldErrors?.subject && (
              <p id="subject-error" className="text-sm text-red-600 mt-1">
                {state.fieldErrors.subject[0]}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Správa *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              disabled={isPending || optimisticSubmitted}
              className={cn(
                "mt-1 min-h-[100px]",
                state?.fieldErrors?.message && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="Napíšte nám vašu správu..."
              aria-describedby={state?.fieldErrors?.message ? "message-error" : undefined}
            />
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
          <Button
            type="submit"
            disabled={isPending || optimisticSubmitted}
            className="w-full"
            size="lg"
          >
            {isPending || optimisticSubmitted ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Odosielam...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Odoslať správu
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Polia označené * sú povinné
        </p>
      </form>
      </Card>
    </div>
  )
}