'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const COOKIE_CONSENT_KEY = 'styrcon-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'styrcon-cookie-preferences';

interface CookiePreferences {
  required: boolean;
  analytical: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    required: true, // Always true
    analytical: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1000);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'customized');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));

    // Update analytics consent based on preferences
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: prefs.analytical ? 'granted' : 'denied',
        ad_storage: prefs.functional ? 'granted' : 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      required: true,
      analytical: true,
      functional: true,
    };
    savePreferences(allAccepted);
    closeBanner();
  };

  const handleRejectOptional = () => {
    const onlyRequired = {
      required: true,
      analytical: false,
      functional: false,
    };
    savePreferences(onlyRequired);
    closeBanner();
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    closeBanner();
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
          {!showCustomize ? (
            // Simple Banner View
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex-1 pr-8">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Používanie cookies
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Táto webová stránka používa cookies na zlepšenie vášho zážitku z prehliadania,
                  analýzu návštevnosti a poskytovanie prispôsobeného obsahu. Súhlasom umožňujete
                  používanie analytických a funkčných cookies.{' '}
                  <a
                    href="/ochrana-osobnych-udajov"
                    className="underline hover:text-gray-900 dark:hover:text-white"
                  >
                    Viac informácií
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  onClick={handleRejectOptional}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Odmietnuť
                </Button>
                <Button
                  onClick={handleCustomize}
                  size="sm"
                  className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Prispôsobiť
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Prijať všetky
                </Button>
              </div>
            </div>
          ) : (
            // Customization View
            <div className="p-6">
              <div className="mb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Nastavenia cookies
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Vyberte si, ktoré cookies chcete povoliť. Povinné cookies sú nevyhnutné pre
                      fungovanie webovej stránky.
                    </p>
                  </div>
                  <div className="flex gap-2 sm:ml-4">
                    <Button
                      onClick={() => setPreferences({ required: true, analytical: true, functional: true })}
                      size="sm"
                      className="flex-1 whitespace-nowrap sm:flex-none bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Prijať všetky
                    </Button>
                    <Button
                      onClick={() => setPreferences({ required: true, analytical: false, functional: false })}
                      variant="outline"
                      size="sm"
                      className="flex-1 whitespace-nowrap sm:flex-none border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      Odmietnuť všetky
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Required Cookies */}
                <div className="flex items-start justify-between rounded-lg border-2 border-gray-300 bg-gray-50/50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Povinné cookies
                      </h4>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        Vždy aktívne
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Nevyhnutné pre správne fungovanie webu (autentifikácia, bezpečnosť, základné funkcie).
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    disabled={true}
                    className="opacity-50"
                  />
                </div>

                {/* Analytical Cookies */}
                <div className="flex items-start justify-between rounded-lg border-2 border-gray-300 bg-gray-50/50 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/50">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Analytické cookies
                      </h4>
                      {preferences.analytical && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                          Povolené
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Pomáhajú nám pochopiť, ako návštevníci využívajú našu stránku (Google Analytics, meranie výkonu).
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytical}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytical: checked })
                    }
                    className="data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-500"
                  />
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between rounded-lg border-2 border-gray-300 bg-gray-50/50 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/50">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Funkčné cookies
                      </h4>
                      {preferences.functional && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                          Povolené
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Umožňujú rozšírené funkcie ako integrácie s tretími stranami a prispôsobenie obsahu.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, functional: checked })
                    }
                    className="data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  onClick={() => setShowCustomize(false)}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Späť
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  size="sm"
                  className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Uložiť nastavenia
                </Button>
              </div>
            </div>
          )}

          <button
            onClick={closeBanner}
            className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label="Zavrieť"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
