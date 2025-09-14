import { SignUp } from '@clerk/nextjs'

export default function RegistraciaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Vytvorte si účet
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Registrácia pre prístup k dokumentom a personalizovaným službám
          </p>
        </div>

        <div className="flex justify-center">
          <SignUp
            afterSignUpUrl="/profil"
            signInUrl="/prihlasenie"
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
                card: "shadow-lg border-0",
                headerTitle: "text-xl font-semibold text-slate-900",
                headerSubtitle: "text-slate-600",
                socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50",
                formFieldLabel: "text-slate-700",
                formFieldInput: "border-slate-300 focus:border-primary focus:ring-primary",
                footerActionLink: "text-primary hover:text-primary/80",
              },
              layout: {
                socialButtonsPlacement: "top",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}