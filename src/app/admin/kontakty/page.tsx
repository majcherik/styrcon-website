'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Eye, MessageSquare, Phone, Building } from 'lucide-react';
import { supabase, type ContactInquiry } from '@/lib/supabase';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: ContactInquiry['status']) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        )
      );

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Kontakty</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Kontakty</h1>
        <div className="text-sm text-slate-500">
          Celkom: {contacts.length} kontaktov
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact List */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <Card className="p-8 text-center">
              <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Žiadne kontakty zatiaľ</p>
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card
                key={contact.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 ${
                  selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{contact.name}</h3>
                    <Badge
                      variant={contact.status === 'new' ? 'default' : contact.status === 'read' ? 'secondary' : 'outline'}
                    >
                      {contact.status === 'new' ? 'Nové' : contact.status === 'read' ? 'Prečítané' : 'Odpovedané'}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(contact.created_at).toLocaleDateString('sk-SK')}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-2">{contact.email}</p>
                <p className="text-sm font-medium text-slate-900 mb-1">{contact.subject}</p>
                <p className="text-sm text-slate-500 line-clamp-2">{contact.message}</p>
              </Card>
            ))
          )}
        </div>

        {/* Contact Detail */}
        <div className="lg:sticky lg:top-6">
          {selectedContact ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Detail kontaktu</h2>
                <div className="flex gap-2">
                  {selectedContact.status === 'new' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(selectedContact.id, 'read')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Označiť ako prečítané
                    </Button>
                  )}
                  {selectedContact.status === 'read' && (
                    <Button
                      size="sm"
                      onClick={() => updateContactStatus(selectedContact.id, 'responded')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Označiť ako odpovedané
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">Meno</label>
                  <p className="text-slate-700">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900">Email</label>
                  <p className="text-slate-700">
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>

                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-slate-900">Telefón</label>
                    <p className="text-slate-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                        {selectedContact.phone}
                      </a>
                    </p>
                  </div>
                )}

                {selectedContact.company && (
                  <div>
                    <label className="text-sm font-medium text-slate-900">Spoločnosť</label>
                    <p className="text-slate-700 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {selectedContact.company}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-slate-900">Predmet</label>
                  <p className="text-slate-700 font-medium">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900">Správa</label>
                  <div className="mt-2 p-4 bg-slate-50 rounded-lg">
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Odoslané: {new Date(selectedContact.created_at).toLocaleString('sk-SK')}</span>
                    <Badge
                      variant={selectedContact.status === 'new' ? 'default' : selectedContact.status === 'read' ? 'secondary' : 'outline'}
                    >
                      {selectedContact.status === 'new' ? 'Nové' : selectedContact.status === 'read' ? 'Prečítané' : 'Odpovedané'}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Vyberte kontakt pre zobrazenie detailov</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}