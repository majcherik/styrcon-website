'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Package, Clock } from 'lucide-react';
import { supabase, type ContactInquiry } from '@/lib/supabase';

interface DashboardStats {
  totalContacts: number;
  newContacts: number;
  totalProducts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    newContacts: 0,
    totalProducts: 0,
  });
  const [recentContacts, setRecentContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch contact stats
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_inquiries')
        .select('id, status')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Fetch recent contacts
      const { data: recent, error: recentError } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Fetch product count
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id');

      if (productsError) throw productsError;

      setStats({
        totalContacts: contacts?.length || 0,
        newContacts: contacts?.filter(c => c.status === 'new').length || 0,
        totalProducts: products?.length || 0,
      });

      setRecentContacts(recent || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-slate-200 rounded w-16"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Všetky kontakty</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalContacts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Nové správy</p>
              <p className="text-3xl font-bold text-slate-900">{stats.newContacts}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Produkty</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Contacts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Najnovšie kontakty</h2>
        {recentContacts.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Žiadne kontakty zatiaľ</p>
        ) : (
          <div className="space-y-4">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-slate-900">{contact.name}</h3>
                    <Badge
                      variant={contact.status === 'new' ? 'default' : contact.status === 'read' ? 'secondary' : 'outline'}
                    >
                      {contact.status === 'new' ? 'Nové' : contact.status === 'read' ? 'Prečítané' : 'Odpovedané'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{contact.email}</p>
                  <p className="text-sm text-slate-500 mt-1">{contact.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    {new Date(contact.created_at).toLocaleDateString('sk-SK')}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(contact.created_at).toLocaleTimeString('sk-SK')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}