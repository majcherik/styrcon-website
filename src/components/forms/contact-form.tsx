'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CheckCircle, Loader2, MailIcon } from 'lucide-react';
import {
  RequiredInput,
  InputWithIcon,
  InputWithClear,
  PhoneInputComponent,
  TextareaNoResize
} from '@/components/ui/origin-inputs/index';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Meno musí obsahovať aspoň 2 znaky'),
  email: z.string().email('Neplatná emailová adresa'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Predmet je povinný'),
  message: z.string().min(10, 'Správa musí obsahovať aspoň 10 znakov'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'Súhlas so spracovaním údajov je povinný'
  })
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      gdprConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        form.reset();
        toast.success('Správa bola úspešne odoslaná!', {
          description: 'Ďakujeme za váš záujem. Ozveme sa vám v najbližšom čase.',
          duration: 5000,
        });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Odoslanie zlyhalo. Skúste to prosím znova.';
        setSubmitError(errorMessage);
        toast.error('Odoslanie zlyhalo', {
          description: errorMessage,
          duration: 6000,
        });
      }
    } catch {
      const errorMessage = 'Nastala chyba pri odosielaní správy. Skúste to prosím znova.';
      setSubmitError(errorMessage);
      toast.error('Chyba pri odosielaní', {
        description: errorMessage,
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="p-8 text-center w-full max-w-2xl mx-auto">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Správa bola úspešne odoslaná
        </h3>
        <p className="text-slate-600 mb-6">
          Ďakujeme za Váš záujem.
        </p>
        <Button
          onClick={() => {
            setSubmitSuccess(false);
            form.reset();
          }}
          variant="outline"
        >
          Odoslať ďalšiu správu
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <InputWithClear
                  label="Meno"
                  placeholder="Vaše meno"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  required
                />
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <InputWithIcon
                  label="Email"
                  placeholder="vasmail@mail.sk"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  icon={MailIcon}
                  required
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <PhoneInputComponent
                  label="Telefón"
                  placeholder="+421 000 000 000"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field, fieldState }) => (
                <InputWithClear
                  label="Spoločnosť"
                  placeholder="Názov spoločnosti"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field, fieldState }) => (
              <InputWithClear
                label="Predmet"
                placeholder="Predmet vašej správy"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                required
              />
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <TextareaNoResize
                label="Správa"
                placeholder="Text vašej správy..."
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                required
              />
            )}
          />

          <FormField
            control={form.control}
            name="gdprConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Súhlasím so spracovaním osobných údajov v súlade s{' '}
                    <a href="/ochrana-osobnych-udajov" className="text-primary hover:underline">
                      ochranou osobných údajov
                    </a>
                    . *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Odosiela sa...
              </>
            ) : (
              'Odoslať správu'
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}