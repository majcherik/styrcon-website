'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth, useUser } from '@clerk/nextjs';
import { DropdownButton } from '@/components/ui/dropdown-button';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { label: 'Domov', href: '/' },
  { label: 'O nás', href: '/o-nas' },
  { 
    label: 'Produkty', 
    href: '#',
    children: [
      { label: 'STYRCON', href: '/styrcon-produkt' },
      { label: 'POLYTEX', href: '/polytex-produkt' }
    ]
  },
  { label: 'Galéria', href: '/galeria' },
  // { label: 'Video Demo', href: '/video-demo' },
  // { label: 'Scroll Demo', href: '/scroll-demo' },
  { label: 'Projekty', href: '/projekty' },
  { label: 'Aktuality', href: '/aktuality' },
  { label: 'Kontakt', href: '/kontakt' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();

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
        ? 'bg-white shadow-sm' 
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
              {navigationItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="relative group">
                      <button
                        className={`
                          px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1
                          text-foreground hover:text-primary hover:bg-primary/5
                        `}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          {item.children.map((childItem) => (
                            <Link
                              key={childItem.href}
                              href={childItem.href}
                              className={`
                                block px-4 py-2 text-sm transition-colors duration-200
                                ${pathname === childItem.href
                                  ? 'text-primary bg-primary/10'
                                  : 'text-foreground hover:text-primary hover:bg-primary/5'
                                }
                              `}
                            >
                              {childItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
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
                );
              })}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            {!isLoaded ? (
              <div className="w-8 h-8 animate-pulse bg-slate-200 rounded-full"></div>
            ) : user ? (
              <DropdownButton />
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
            {navigationItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <div className="px-3 py-2 text-base font-medium text-slate-500 border-b border-slate-200">
                      {item.label}
                    </div>
                    {item.children.map((childItem) => (
                      <Link
                        key={childItem.href}
                        href={childItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-6 py-2 rounded-md text-base font-medium transition-colors duration-200
                          ${pathname === childItem.href
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                          }
                        `}
                      >
                        {childItem.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              
              return (
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
              );
            })}
            <div className="pt-4 space-y-2">
              {!isLoaded ? (
                <div className="flex justify-center py-4">
                  <div className="w-full h-10 animate-pulse bg-slate-200 rounded"></div>
                </div>
              ) : user ? (
                <>
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                    <Link href="/profil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">
                        {user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Profil'}
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