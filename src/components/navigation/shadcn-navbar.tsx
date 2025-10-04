'use client';

import { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Home,
  Info,
  Package,
  FolderOpen,
  Newspaper,
  Phone,
  ChevronDown
} from 'lucide-react';
import { useAuth, useUser, UserButton, SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Domov',
    href: '/',
    icon: Home
  },
  {
    label: 'O nás',
    href: '/o-nas',
    icon: Info
  },
  {
    label: 'Produkty',
    href: '#',
    icon: Package,
    children: [
      { label: 'STYRCON', href: '/styrcon-produkt', icon: Package },
      { label: 'POLYTEX', href: '/polytex-produkt', icon: Package }
    ]
  },
  {
    label: 'Info',
    href: '#',
    icon: FolderOpen,
    children: [
      { label: 'Aktuality', href: '/aktuality', icon: Newspaper },
      { label: 'Dokumenty', href: '/dokumenty', icon: FolderOpen },
    ]
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
    icon: Phone
  },
];


export function ShadcnNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

  // Optimized navigation handler
  const handleNavigation = useCallback((href: string) => {
    if (href === '#') return;

    startTransition(() => {
      router.push(href);
      setIsOpen(false); // Close mobile menu after navigation
    });
  }, [router]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleItemClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      handleNavigation(href);
    }
  }, [handleNavigation]);

  // Helper function to determine if page should show white text at top
  const shouldShowWhiteTextAtTop = () => {
    const whiteTextPages = ['/'];
    return whiteTextPages.includes(pathname);
  };

  // Prevent hydration mismatch by showing placeholder during SSR
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

            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                <div className="w-32 h-8 animate-pulse bg-white/10 rounded-lg"></div>
                <div className="w-32 h-8 animate-pulse bg-white/10 rounded-lg"></div>
                <div className="w-32 h-8 animate-pulse bg-white/10 rounded-lg"></div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 animate-pulse bg-white/10 rounded-lg"></div>
                <div className="w-16 h-8 animate-pulse bg-white/10 rounded-lg"></div>
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      } ${isPending ? 'opacity-75 pointer-events-none' : ''}`}
    >
      {/* Navigation Pending Indicator */}
      {isPending && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center flex-nowrap min-w-fit" onClick={handleItemClick}>
              <div className={`text-xl font-bold whitespace-nowrap ${
                isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-900' : 'text-white'
              }`}>
                STYRCON
              </div>
              <div className={`hidden sm:block ml-2 text-sm whitespace-nowrap ${
                isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-600' : 'text-gray-200'
              }`}>
                E-MA SK s.r.o.
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Simple Dropdown */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.children && item.children.some(child => pathname === child.href));

                if (item.children) {
                  return (
                    <div key={item.label} className="relative group">
                      <button 
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                          isScrolled || !shouldShowWhiteTextAtTop()
                            ? "hover:bg-gray-100 text-gray-700" 
                            : "hover:bg-white/15 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg text-white",
                          isActive && (isScrolled || !shouldShowWhiteTextAtTop()
                            ? "bg-gray-100 text-primary" 
                            : "bg-white/20 backdrop-blur-md border border-white/30 shadow-md text-white")
                        )}
                      >
                        <Icon className={cn("w-4 h-4", 
                          isScrolled || !shouldShowWhiteTextAtTop() ? "text-gray-700" : "text-white"
                        )} />
                        <span className={cn(
                          isScrolled || !shouldShowWhiteTextAtTop() ? "text-gray-700" : "text-white"
                        )}>{item.label}</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform group-hover:rotate-180",
                          isScrolled || !shouldShowWhiteTextAtTop() ? "text-gray-700" : "text-white"
                        )} />
                      </button>
                      <div className={cn(
                        "absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
                        isScrolled 
                          ? "bg-white border-gray-200" 
                          : "bg-white/95 backdrop-blur-md border-white/20"
                      )}>
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleItemClick}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 first:rounded-t-lg last:rounded-b-lg",
                                isScrolled 
                                  ? "hover:bg-gray-50 text-gray-700" 
                                  : "hover:bg-white/20 text-gray-900",
                                pathname === child.href && (isScrolled 
                                  ? "bg-gray-50 text-primary" 
                                  : "bg-white/20")
                              )}
                            >
                              <ChildIcon className="w-4 h-4" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      isScrolled || !shouldShowWhiteTextAtTop()
                        ? "hover:bg-gray-100 text-gray-700" 
                        : "hover:bg-white/15 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg text-white",
                      pathname === item.href && (isScrolled || !shouldShowWhiteTextAtTop()
                        ? "bg-gray-100 text-primary" 
                        : "bg-white/20 backdrop-blur-md border border-white/30 shadow-md text-white")
                    )}
                  >
                    <Icon className={cn("w-4 h-4",
                      isScrolled || !shouldShowWhiteTextAtTop() ? "text-gray-700" : "text-white"
                    )} />
                    <span className={cn(
                      isScrolled || !shouldShowWhiteTextAtTop() ? "text-gray-700" : "text-white"
                    )}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <ClerkLoading>
                <div className="flex items-center gap-2">
                  <Loader2 className={`h-4 w-4 animate-spin ${
                    isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-600' : 'text-white'
                  }`} />
                  <span className={`text-sm ${
                    isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-600' : 'text-white'
                  }`}>
                    Načítavam...
                  </span>
                </div>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                        userButtonTrigger: `${
                          isScrolled || !shouldShowWhiteTextAtTop()
                            ? 'hover:bg-gray-100'
                            : 'hover:bg-white/15 hover:backdrop-blur-md'
                        } transition-all duration-300 rounded-lg`,
                        userButtonPopoverCard: "shadow-lg border border-gray-200",
                        userButtonPopoverActionButton: "hover:bg-gray-50",
                        userButtonPopoverActionButtonText: "text-slate-700",
                        userButtonPopoverActionButtonIcon: "text-slate-500",
                      },
                    }}
                    userProfileMode="navigation"
                    userProfileUrl="/profil"
                  >
                  </UserButton>
                </SignedIn>

                <SignedOut>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/prihlasenie" className={`${
                        isScrolled || !shouldShowWhiteTextAtTop()
                          ? 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700'
                          : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white'
                      }`}>
                        Prihlásenie
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/registracia" className={`${
                        isScrolled || !shouldShowWhiteTextAtTop()
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-primary/90 backdrop-blur-md hover:bg-primary text-white'
                      }`}>
                        Registrácia
                      </Link>
                    </Button>
                  </div>
                </SignedOut>
              </ClerkLoaded>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700' 
                  : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`lg:hidden mt-2 ${
            isScrolled ? 'border-t border-gray-200' : 'border-t border-white/20'
          }`}>
            <div className={`py-4 space-y-2 rounded-xl shadow-xl ${
              isScrolled 
                ? 'bg-white border border-gray-200' 
                : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                
                if (item.children) {
                  return (
                    <div key={item.label} className="space-y-1">
                      <div className={`flex items-center gap-3 px-4 py-3 font-medium ${
                        isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-900' : 'text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <div className="ml-8 space-y-1">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleItemClick}
                              className={`flex items-center gap-3 px-4 py-2 transition-all duration-200 ${
                                isScrolled || !shouldShowWhiteTextAtTop() ? 'hover:bg-gray-50 text-gray-600' : 'hover:bg-white/15 text-gray-300'
                              }`}
                            >
                              <ChildIcon className="w-4 h-4" />
                              <span className="text-sm">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                      isScrolled || !shouldShowWhiteTextAtTop() ? 'hover:bg-gray-50 text-gray-700' : 'hover:bg-white/15 text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Auth Section */}
              <div className={`pt-4 space-y-2 ${
                isScrolled ? 'border-t border-gray-200' : 'border-t border-white/20'
              }`}>
                <ClerkLoading>
                  <div className="flex items-center justify-center gap-2 py-4">
                    <Loader2 className={`h-4 w-4 animate-spin ${
                      isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-600' : 'text-white'
                    }`} />
                    <span className={`text-sm ${
                      isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-600' : 'text-white'
                    }`}>
                      Načítavam...
                    </span>
                  </div>
                </ClerkLoading>

                <ClerkLoaded>
                  <SignedIn>
                    <div className="flex flex-col items-center gap-4">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10",
                            userButtonTrigger: "hover:bg-gray-100 transition-all duration-300 rounded-lg",
                            userButtonPopoverCard: "shadow-lg border border-gray-200",
                            userButtonPopoverActionButton: "hover:bg-gray-50",
                            userButtonPopoverActionButtonText: "text-slate-700",
                            userButtonPopoverActionButtonIcon: "text-slate-500",
                          },
                        }}
                        userProfileMode="navigation"
                        userProfileUrl="/profil"
                      >
                      </UserButton>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <>
                      <Button variant="outline" asChild className={`w-full ${
                        isScrolled
                          ? 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700'
                          : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                      }`}>
                        <Link href="/prihlasenie" onClick={handleItemClick}>
                          Prihlásenie
                        </Link>
                      </Button>
                      <Button asChild className={`w-full ${
                        isScrolled
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-primary/90 backdrop-blur-md hover:bg-primary'
                      }`}>
                        <Link href="/registracia" onClick={handleItemClick}>
                          Registrácia
                        </Link>
                      </Button>
                    </>
                  </SignedOut>
                </ClerkLoaded>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}