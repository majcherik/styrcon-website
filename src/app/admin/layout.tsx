import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, Mail, Package, Settings } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                STYRCON
              </Link>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  Návrat na web
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <nav className="space-y-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/kontakty"
                  className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  Kontakty
                </Link>
                <Link
                  href="/admin/produkty"
                  className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Package className="h-5 w-5" />
                  Produkty
                </Link>
                <Link
                  href="/admin/nastavenia"
                  className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  Nastavenia
                </Link>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}