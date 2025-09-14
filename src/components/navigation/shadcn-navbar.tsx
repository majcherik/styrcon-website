'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Package, 
  Images, 
  Play, 
  Scroll, 
  Box,
  FolderOpen, 
  Newspaper, 
  Phone,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { DropdownButton } from '@/components/ui/dropdown-button';
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
    label: 'Demo',
    href: '#',
    icon: Play,
    children: [
      { label: 'Video Demo', href: '/video-demo', icon: Play },
      { label: 'Scroll Demo', href: '/scroll-demo', icon: Scroll },
      { label: 'Test 3D', href: '/test-3d', icon: Box },
    ]
  },
  { 
    label: 'Galéria', 
    href: '/galeria', 
    icon: Images 
  },
  {
    label: 'Info',
    href: '#',
    icon: FolderOpen,
    children: [
      { label: 'Projekty', href: '/projekty', icon: FolderOpen },
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
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAuthReady, signOut } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

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

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/');
    }
    setIsOpen(false);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  // Helper function to determine if page should show white text at top
  const shouldShowWhiteTextAtTop = () => {
    const whiteTextPages = ['/', '/video-demo', '/scroll-demo', '/test-3d', '/galeria'];
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
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={handleItemClick}>
              <div className={`text-xl font-bold ${
                isScrolled || !shouldShowWhiteTextAtTop() ? 'text-gray-900' : 'text-white'
              }`}>
                STYRCON
              </div>
              <div className={`hidden sm:block ml-2 text-sm ${
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
              {!isAuthReady ? (
                <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full backdrop-blur-sm"></div>
              ) : user ? (
                <DropdownButton />
              ) : (
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
              )}
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
                {!isAuthReady ? (
                  <div className="flex justify-center py-4">
                    <div className="w-full h-10 animate-pulse bg-white/20 rounded backdrop-blur-sm"></div>
                  </div>
                ) : user ? (
                  <div className="flex flex-col items-center gap-4">
                    <DropdownButton />
                    <Button
                      variant="outline"
                      className={`w-full ${
                        isScrolled 
                          ? 'bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700' 
                          : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                      }`}
                      onClick={() => {
                        handleSignOut();
                        handleItemClick();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Odhlásiť sa
                    </Button>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}