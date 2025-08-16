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
  Cube,
  FolderOpen, 
  Newspaper, 
  Phone,
  User,
  LogOut,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

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
    label: 'Produkt', 
    href: '/styrcon-produkt', 
    icon: Package 
  },
  {
    label: 'Demo',
    href: '#',
    icon: Play,
    children: [
      { label: 'Video Demo', href: '/video-demo', icon: Play },
      { label: 'Scroll Demo', href: '/scroll-demo', icon: Scroll },
      { label: 'Test 3D', href: '/test-3d', icon: Cube },
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
    ]
  },
  { 
    label: 'Kontakt', 
    href: '/kontakt', 
    icon: Phone 
  },
];

export function GlassmorphicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAuthReady, signOut } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

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
        setOpenDropdown(null);
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

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={handleItemClick}>
              <div className="text-xl font-bold text-slate-900">
                STYRCON
              </div>
              <div className="hidden sm:block ml-2 text-sm text-slate-600">
                E-MA SK s.r.o.
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.children && item.children.some(child => pathname === child.href));

                if (item.children) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ease-out hover:bg-white/15 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg ${
                          isActive ? 'bg-white/20 backdrop-blur-md border border-white/30 shadow-md' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                        {openDropdown === item.label ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {openDropdown === item.label && (
                        <div className="absolute top-full mt-2 left-0 min-w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl py-2 z-50">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={handleItemClick}
                                className={`flex items-center gap-3 px-4 py-3 hover:bg-white/15 transition-all duration-200 ${
                                  pathname === child.href ? 'bg-white/20 shadow-sm' : ''
                                }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ease-out hover:bg-white/15 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg ${
                      pathname === item.href ? 'bg-white/20 backdrop-blur-md border border-white/30 shadow-md' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:block">
            {!isAuthReady ? (
              <div className="w-6 h-6 animate-pulse bg-white/20 rounded backdrop-blur-sm"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profil" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
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
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4" />
                  Odhlásiť
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/prihlasenie" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
                    Prihlásenie
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/registracia" className="bg-primary/90 backdrop-blur-md hover:bg-primary">
                    Registrácia
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/20 mt-2">
            <div className="py-4 space-y-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                
                if (item.children) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/15 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {openDropdown === item.label ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      
                      {openDropdown === item.label && (
                        <div className="ml-8 space-y-1">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={handleItemClick}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-white/15 transition-all duration-200"
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span className="text-sm">{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/15 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-white/20 space-y-2">
                {!isAuthReady ? (
                  <div className="flex justify-center py-4">
                    <div className="w-full h-10 animate-pulse bg-white/20 rounded backdrop-blur-sm"></div>
                  </div>
                ) : user ? (
                  <>
                    <Button asChild className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20" onClick={handleItemClick}>
                      <Link href="/profil" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="truncate">
                          {profile?.first_name || user.email?.split('@')[0] || 'Profil'}
                        </span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Odhlásiť sa
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
                      <Link href="/prihlasenie" onClick={handleItemClick}>
                        Prihlásenie
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-primary/90 backdrop-blur-md hover:bg-primary">
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