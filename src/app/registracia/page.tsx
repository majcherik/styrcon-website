'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const registerSchema = z.object({
  name: z.string().min(2, 'Meno musí mať aspoň 2 znaky'),
  email: z.string().email('Neplatná emailová adresa'),
  password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    // Split name into first and last name
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error } = await signUp(data.email, data.password, {
      first_name: firstName,
      last_name: lastName,
    });

    if (error) {
      setError(
        error.message === 'User already registered'
          ? 'Používateľ s týmto emailom už existuje'
          : 'Nastala chyba pri registrácii. Skúste to prosím znova.'
      );
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign-up
    console.log('Google sign-up clicked');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Registrácia úspešná!</h1>
            <p className="text-slate-600 mb-6">
              Skontrolujte si email a potvrďte svoju registráciu kliknutím na odkaz v správe.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/prihlasenie">Prejsť na prihlásenie</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Návrat na hlavnú stránku</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo/Branding */}
          <div className="flex items-center mb-12">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">STYRCON</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Registrácia</h1>
            <p className="text-slate-600">Vytvorte si účet pre prístup k dokumentom a službám.</p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-slate-900 mb-2 block">
                Meno
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Zadajte svoje meno"
                className="h-12 text-base"
                {...register('name')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-900 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Zadajte váš email"
                className="h-12 text-base"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-slate-900 mb-2 block">
                Heslo
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Vytvorte heslo"
                  className="h-12 text-base pr-12"
                  {...register('password')}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-500">Heslo musí mať aspoň 8 znakov.</p>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Registruje sa...' : 'Začať'}
            </Button>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Registrovať sa cez Google
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Už máte účet?{' '}
              <Link href="/prihlasenie" className="text-primary hover:underline font-medium">
                Prihláste sa
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image with Testimonial Overlay */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-slate-100 to-slate-200">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/KqT5Kn8.jpeg"
            alt="Profesionálne stavebné práce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* STYRCON Benefits Card */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-white text-xl font-semibold mb-4">Prečo Styrcon?</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-white text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Zdravotne nezávadný pri práci aj koncovom použití</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Ľahká manipulácia a práca s materiálom</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Pevné dosky</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Nehorľavosť</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Aj vnútorná izolácia</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Alternativa ku sanačným omietkam</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Rýchla stavba</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Rýchla izolácia podzemných garáží</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Stratené debnenie</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Jedinečné použitie na rekonštrukciu starých domov</span>
              </div>
              <div className="flex items-start gap-2 col-span-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Stavba rodinných domov zo Styrcon-u</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}