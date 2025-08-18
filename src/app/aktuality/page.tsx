'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// This would normally be exported from layout, but we'll define it here for the component
const metadata: Metadata = {
  title: 'Aktuality - Zdroje a informácie | STYRCON - E-MA SK',
  description: 'Objavte najnovšie články, technické príručky a informácie o STYRCON produktoch. Vzdelávacie zdroje pre stavebníkov a odborníkov.',
  keywords: 'styrcon aktuality, technické články, stavebné materiály, vzdelávacie zdroje, príručky',
};

interface ResourceCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const categories = [
  { id: 'all', label: 'Všetko' },
  { id: 'design', label: 'Dizajn' },
  { id: 'product', label: 'Produkty' },
  { id: 'development', label: 'Vývoj' },
  { id: 'customer', label: 'Zákazníci' }
];

const resourceCards: ResourceCard[] = [
  {
    id: '1',
    title: 'UX návrh prezentácií',
    description: 'Ako vytvoriť presvedčivé prezentácie, ktoré vašich kolegov a klientov dostanú na správnu cestu.',
    category: 'design',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '2',
    title: 'Migrácia na STYRCON 101',
    description: 'Naučte sa základné informácie o migrácii, servisoch, tipoch a osvedčených postupoch priamo od tímu.',
    category: 'product',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '3',
    title: 'Budovanie vášho API stacku',
    description: 'Naučte sa najlepšie postupy pre budovanie API stacku pre vytvorenie, testovanie a správu API.',
    category: 'development',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '4',
    title: 'B2B vedenie pre lídrov',
    description: 'B2B vedenie je všade okolo nás. Je to takmer ako v 2-2 vo svojom plánovaní pre štýlový tím.',
    category: 'customer',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '5',
    title: 'PDF mentálne modely',
    description: 'Rýchly návod na vytvorenie komplexných procesov na zvládanie náročných požiadaviek.',
    category: 'product',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '6',
    title: 'Čo je webfishing?',
    description: 'Webfishing je pokročilá technika pre používateľov ktorí sú už plní ľudia na to aby získali.',
    category: 'design',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '7',
    title: 'Ako spolupráca funguje lepšie',
    description: 'Keď dizajnéri a developeri spolupracujú od začiatku, dosahujú lepšie výsledky pre každého.',
    category: 'customer',
    image: '/placeholder.jpg',
    link: '#'
  },
  {
    id: '8',
    title: 'Náš top 10 Javascript frameworkov na použitie',
    description: 'Jeden z najdôležitejších faktorov pri výbere frameworku je schopnosť tím implementácie.',
    category: 'development',
    image: '/placeholder.jpg',
    link: '#'
  }
];

export default function AktualityPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = resourceCards.filter(card => {
    const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-primary">
              Domov
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Aktuality</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Knižnica zdrojov
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Prihláste sa na odber, aby ste sa dozvedeli viac o našich produktových funkciách, 
              najnovších technológiách, aktualizáciách a ďalších.
            </p>
            
            {/* Search Section */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Hľadať svoje zdroje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90">
                Začať
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div key={card.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                      {categories.find(cat => cat.id === card.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                  
                  <Link 
                    href={card.link}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                  >
                    Čítať viac
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                Nenašli sa žiadne zdroje pre aktuálne kritériá vyhľadávania.
              </p>
            </div>
          )}
          
          {filteredCards.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Stránka</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        page === 1 
                          ? 'bg-primary text-white' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}