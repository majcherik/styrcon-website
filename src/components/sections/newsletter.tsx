import { Calendar, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
              Prihláste sa na novinky
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Získajte najnovšie informácie o STYRCON produktoch, technické články 
              a odborné poradenstvo priamo do vašej emailovej schránky.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Emailová adresa
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Zadajte váš email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              />
              <Button
                type="submit"
                className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold"
              >
                Prihlásiť
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-primary/10 p-2">
                <Calendar aria-hidden="true" className="h-6 w-6 text-primary" />
              </div>
              <dt className="mt-4 text-base font-semibold text-slate-900">Technické články</dt>
              <dd className="mt-2 text-base/7 text-slate-600">
                Pravidelné informácie o novinkách v oblasti tepelnoizolačných materiálov 
                a stavebných technológií.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-primary/10 p-2">
                <UserCheck aria-hidden="true" className="h-6 w-6 text-primary" />
              </div>
              <dt className="mt-4 text-base font-semibold text-slate-900">Bez spamu</dt>
              <dd className="mt-2 text-base/7 text-slate-600">
                Zasielame iba relevantné a užitočné informácie. Váš email nebude 
                zdieľaný s tretími stranami.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-20"
        />
      </div>
    </div>
  );
}