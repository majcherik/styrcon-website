'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { label: 'Domov', href: '/' },
  { label: 'O nás', href: '/o-nas' },
  { 
    label: 'Produkt', 
    href: '/styrcon-produkt'
  },
  { label: 'Galéria', href: '/galeria' },
  { label: 'Video Demo', href: '/video-demo' },
  { label: 'Projekty', href: '/projekty' },
  { label: 'Aktuality', href: '/aktuality' },
  { label: 'Kontakt', href: '/kontakt' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAuthReady, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/');
    }
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-200
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm' 
        : 'bg-white'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-xl font-bold text-primary">
                STYRCON
              </div>
              <div className="hidden sm:block ml-2 text-sm text-muted-foreground">
                E-MA SK s.r.o.
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {!isAuthReady ? (
              <div className="w-6 h-6 animate-pulse bg-slate-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profil" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-24 truncate">
                      {profile?.first_name || user.email?.split('@')[0] || 'Profil'}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Odhlásiť
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/prihlasenie">Prihlásenie</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/registracia">Registrácia</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10"
            >
              <span className="sr-only">Otvoriť menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu" 
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-border">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {!isAuthReady ? (
                <div className="flex justify-center py-4">
                  <div className="w-full h-10 animate-pulse bg-slate-200 rounded"></div>
                </div>
              ) : user ? (
                <>
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                    <Link href="/profil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">
                        {profile?.first_name || user.email?.split('@')[0] || 'Profil'}
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Odhlásiť sa
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/prihlasenie" onClick={() => setIsOpen(false)}>
                      Prihlásenie
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/registracia" onClick={() => setIsOpen(false)}>
                      Registrácia
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}