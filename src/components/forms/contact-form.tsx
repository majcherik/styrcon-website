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
import { CheckCircle, Loader2 } from 'lucide-react';

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
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || 'Odoslanie zlyhalo. Skúste to prosím znova.');
      }
    } catch {
      setSubmitError('Nastala chyba pri odosielaní správy. Skúste to prosím znova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Správa bola úspešne odoslaná
        </h3>
        <p className="text-slate-600 mb-6">
          Ďakujeme za Váš záujem o STYRCON produkty. Odpovieme Vám do 24 hodín.
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meno *</FormLabel>
                  <FormControl>
                    <Input placeholder="Vaše meno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="vás@email.sk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefón</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+421 xxx xxx xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spoločnosť</FormLabel>
                  <FormControl>
                    <Input placeholder="Názov spoločnosti" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Predmet *</FormLabel>
                <FormControl>
                  <Input placeholder="Predmet vašej správy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Správa *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Opíšte váš projekt alebo položte otázku o STYRCON produktoch..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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