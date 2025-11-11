"use client";
import React, { useState, useEffect, useCallback, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from 'lucide-react';

export function AceternityNavbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    if (href === '#') return;

    startTransition(() => {
      router.push(href);
      setIsOpen(false);
    });
  }, [router]);

  const handleItemClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      handleNavigation(href);
    }
  }, [handleNavigation]);

  const isMainPage = pathname === '/';

  // Determine if we should use dark theme for navbar
  const isDarkNavbar = isMainPage && !isScrolled;

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="text-xl font-bold text-slate-900">
                  STYRCON
                </div>
                <div className="hidden sm:block ml-2 text-sm text-slate-600">
                  E-MA SK s.r.o.
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-lg"
            : "bg-transparent",
          isPending ? "opacity-75 pointer-events-none" : ""
        )}
      >
        {isPending && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center flex-nowrap min-w-fit" onClick={handleItemClick}>
                <div className={cn(
                  "text-xl font-bold whitespace-nowrap",
                  isDarkNavbar ? 'text-white' : 'text-gray-900'
                )}>
                  STYRCON
                </div>
                <div className={cn(
                  "hidden sm:block ml-2 text-sm whitespace-nowrap",
                  isDarkNavbar ? 'text-gray-200' : 'text-gray-600'
                )}>
                  E-MA SK s.r.o.
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-start ml-12">
              <div className={cn(
                "flex items-center space-x-6 transition-all duration-300",
                isDarkNavbar ? "text-white" : "text-gray-900"
              )}>
                <Menu setActive={setActive}>
                  {/* Domov */}
                  <Link href="/" onClick={handleItemClick}>
                    <MenuItem setActive={setActive} active={active} item="Domov" isDark={isDarkNavbar}>
                    </MenuItem>
                  </Link>

                  {/* O nás */}
                  <Link href="/o-nas" onClick={handleItemClick}>
                    <MenuItem setActive={setActive} active={active} item="O nás" isDark={isDarkNavbar}>
                    </MenuItem>
                  </Link>

                  {/* Produkty */}
                  <MenuItem setActive={setActive} active={active} item="Produkty" isDark={isDarkNavbar}>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <ProductItem
                        title="STYRCON"
                        href="/styrcon-produkt"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='70'%3E%3Crect width='140' height='70' fill='%230ea5e9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3ESTYRCON%3C/text%3E%3C/svg%3E"
                        description="Paropriepustné tepelnoizolačné dosky triedy A2-s1,d0"
                        isDark={isDarkNavbar}
                      />
                      <ProductItem
                        title="POLYTEX"
                        href="/polytex-produkt"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='70'%3E%3Crect width='140' height='70' fill='%2310b981'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EPOLYTEX%3C/text%3E%3C/svg%3E"
                        description="Hygienické farby so striebrom pre interiéry"
                        isDark={isDarkNavbar}
                      />
                    </div>
                  </MenuItem>

                  {/* Info */}
                  <MenuItem setActive={setActive} active={active} item="Info" isDark={isDarkNavbar}>
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="/aktuality" isDark={isDarkNavbar}>Aktuality</HoveredLink>
                      <HoveredLink href="/dokumenty" isDark={isDarkNavbar}>Dokumenty</HoveredLink>
                    </div>
                  </MenuItem>

                  {/* Kontakt */}
                  <Link href="/kontakt" onClick={handleItemClick}>
                    <MenuItem setActive={setActive} active={active} item="Kontakt" isDark={isDarkNavbar}>
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            </div>


            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isDarkNavbar
                    ? 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                    : 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700'
                )}
              >
                {isOpen ? (
                  <X className={cn(
                    "h-6 w-6",
                    isDarkNavbar ? 'text-white' : 'text-gray-700'
                  )} />
                ) : (
                  <MenuIcon className={cn(
                    "h-6 w-6",
                    isDarkNavbar ? 'text-white' : 'text-gray-700'
                  )} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className={cn(
              "lg:hidden mt-2"
            )}>
              <div className={cn(
                "py-4 space-y-2 rounded-xl shadow-xl",
                isDarkNavbar
                  ? 'bg-gray-900 border border-white/20'
                  : 'bg-white border border-gray-200'
              )}>
                <Link
                  href="/"
                  onClick={handleItemClick}
                  className={cn(
                    "block px-4 py-3 font-medium transition-all duration-200",
                    isDarkNavbar ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  Domov
                </Link>
                <Link
                  href="/o-nas"
                  onClick={handleItemClick}
                  className={cn(
                    "block px-4 py-3 font-medium transition-all duration-200",
                    isDarkNavbar ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  O nás
                </Link>

                {/* Produkty Section */}
                <div className="space-y-1">
                  <div className={cn(
                    "px-4 py-3 font-medium",
                    isDarkNavbar ? 'text-white' : 'text-gray-900'
                  )}>
                    Produkty
                  </div>
                  <div className="ml-8 space-y-1">
                    <Link
                      href="/styrcon-produkt"
                      onClick={handleItemClick}
                      className={cn(
                        "block px-4 py-2 text-sm transition-all duration-200",
                        isDarkNavbar ? 'hover:bg-white/15 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                      )}
                    >
                      STYRCON
                    </Link>
                    <Link
                      href="/polytex-produkt"
                      onClick={handleItemClick}
                      className={cn(
                        "block px-4 py-2 text-sm transition-all duration-200",
                        isDarkNavbar ? 'hover:bg-white/15 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                      )}
                    >
                      POLYTEX
                    </Link>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-1">
                  <div className={cn(
                    "px-4 py-3 font-medium",
                    isDarkNavbar ? 'text-white' : 'text-gray-900'
                  )}>
                    Info
                  </div>
                  <div className="ml-8 space-y-1">
                    <Link
                      href="/aktuality"
                      onClick={handleItemClick}
                      className={cn(
                        "block px-4 py-2 text-sm transition-all duration-200",
                        isDarkNavbar ? 'hover:bg-white/15 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                      )}
                    >
                      Aktuality
                    </Link>
                    <Link
                      href="/dokumenty"
                      onClick={handleItemClick}
                      className={cn(
                        "block px-4 py-2 text-sm transition-all duration-200",
                        isDarkNavbar ? 'hover:bg-white/15 text-gray-300' : 'hover:bg-gray-50 text-gray-600'
                      )}
                    >
                      Dokumenty
                    </Link>
                  </div>
                </div>

                <Link
                  href="/kontakt"
                  onClick={handleItemClick}
                  className={cn(
                    "block px-4 py-3 font-medium transition-all duration-200",
                    isDarkNavbar ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  Kontakt
                </Link>

              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
