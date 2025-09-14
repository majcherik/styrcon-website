'use client'

import { UserProfile, SignedIn, SignedOut } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Môj profil
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Spravujte svoje osobné údaje a nastavenia účtu
          </p>
        </div>

        <SignedIn>
          <div className="flex justify-center">
            <UserProfile
              appearance={{
                elements: {
                  card: "shadow-lg border-0",
                  headerTitle: "text-xl font-semibold text-slate-900",
                  headerSubtitle: "text-slate-600",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
                  formFieldLabel: "text-slate-700",
                  formFieldInput: "border-slate-300 focus:border-primary focus:ring-primary",
                  footerActionLink: "text-primary hover:text-primary/80",
                  navbar: "bg-slate-50",
                  navbarButton: "text-slate-700 hover:bg-slate-100",
                  navbarButtonIcon: "text-slate-500",
                  profileSectionTitle: "text-slate-900",
                  profileSectionContent: "text-slate-700",
                  breadcrumbsItem: "text-slate-600",
                  breadcrumbsItemDivider: "text-slate-400",
                  pageScrollBox: "bg-white",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                },
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-slate-600">Presmerovávame vás na prihlásenie...</p>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}