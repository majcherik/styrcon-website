'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Building, Phone, Save, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import type { UserProfile } from '@/lib/supabase';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Meno musí mať aspoň 2 znaky'),
  lastName: z.string().min(2, 'Priezvisko musí mať aspoň 2 znaky'),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/prihlasenie');
      return;
    }

    if (profile) {
      reset({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        company: profile.company || '',
        phone: profile.phone || '',
      });
    }
  }, [user, profile, loading, router, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const updates: Partial<UserProfile> = {
      first_name: data.firstName,
      last_name: data.lastName,
      company: data.company || null,
      phone: data.phone || null,
    };

    const { error } = await updateProfile(updates);

    if (error) {
      setError('Nastala chyba pri ukladaní profilu. Skúste to prosím znova.');
    } else {
      setSuccess('Profil bol úspešne aktualizovaný.');
      reset(data); // Reset form dirty state
    }

    setIsLoading(false);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Môj profil</h1>
          <p className="text-slate-600">Spravujte svoje osobné údaje</p>
        </div>

        <div className="space-y-6">
          {/* Account Info */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Informácie o účte</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Odhlásiť sa
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-900">Email</Label>
                <div className="flex items-center gap-3 mt-1">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">{user.email}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-900">Registrovaný</Label>
                <div className="flex items-center gap-3 mt-1">
                  <User className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">
                    {new Date(user.created_at).toLocaleDateString('sk-SK')}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Osobné údaje</h2>

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-900">
                    Meno *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register('firstName')}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-900">
                    Priezvisko *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-slate-900">
                  Spoločnosť
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Názov spoločnosti"
                    className="pl-10"
                    {...register('company')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-900">
                  Telefón
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+421 xxx xxx xxx"
                    className="pl-10"
                    {...register('phone')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading || !isDirty}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Ukladá sa...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Uložiť zmeny
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}