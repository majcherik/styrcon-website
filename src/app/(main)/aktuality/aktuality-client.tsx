'use client';

import { useState, useDeferredValue, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  { id: 'technicke', label: 'Technické články' },
  { id: 'zateplovanie', label: 'Zatepľovanie' },
  { id: 'sanacia', label: 'Sanácia' },
  { id: 'prakticke', label: 'Praktické rady' }
];

const resourceCards: ResourceCard[] = [
  {
    id: 'ako-sa-da-zateplit-vlhka-stavba',
    title: 'Ako sa dá zatepliť vlhká stavba?',
    description: 'Praktický návod na zatepľovanie vlhkých budov s STYRCON riešeniami. Význam paropriepustnosti a správnych postupov.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952',
    link: '/aktuality/ako-sa-da-zateplit-vlhka-stavba'
  },
  {
    id: 'styrcon-200-info',
    title: 'STYRCON 200 INFO',
    description: 'Dosky STYRCON 200 v kontakte s vlhkým murivom ostávajú na povrchu suché. Nehorľavé a sanačné zateplenie s výnimočnými vlastnosťami.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/styrcon-200-info-e-news-83-5-400-300-0-ffffff.jpg?v=1633090175',
    link: '/aktuality/styrcon-200-info'
  },
  {
    id: 'blizi-sa-zdrazovanie-klucoveho-materialu',
    title: 'Blíži sa zdražovanie kľúčového materiálu',
    description: 'Ceny cementu porastú výrazne. Styrcon zabezpečil cement v predstihu, aby sa vyhol výpadkom vo výrobe. Naše dodávky stále v starých cenách.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/blizi-sa-zdrazovanie-klucoveho-materialu-e-news-85-5-400-300-0-ffffff.jpg?v=1633344609',
    link: '/aktuality/blizi-sa-zdrazovanie-klucoveho-materialu'
  },
  {
    id: 'ako-sa-vyznat-v-omietkach',
    title: 'Ako sa vyznať v omietkach',
    description: 'Komplexný prehľad minerálnych a pastovitých omietok. Porovnanie akrylátových a silikónových omietok s ich výhodami a nevýhodami.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/ako-sa-vyznat-v-omietkach-e-news-86-5-400-300-0-ffffff.jpg?v=1633613713',
    link: '/aktuality/ako-sa-vyznat-v-omietkach'
  },
  {
    id: 'zateplena-tvarnica-styrcon',
    title: 'Zateplená tvarnica STYRCON',
    description: 'Prototyp zateplenej tvarnice Styrcon, ktorá obsahuje zateplenie už v sebe. Inovatívne riešenie pre moderné stavebníctvo.',
    category: 'zateplovanie',
    image: 'https://www.e-ma.sk/imgcache/zateplena-tvarnica-styrcon-e-news-87-5-400-300-0-ffffff.jpg?v=1634199762',
    link: '/aktuality/zateplena-tvarnica-styrcon'
  },
  {
    id: 'ceny-komodit',
    title: 'Ceny komodít',
    description: 'Stavebné materiály zdraželi výrazně. Analýza súčasného trhu, príčiny nárastu cien a ako sa to týka našich dodávok STYRCON.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/ceny-komodit-e-news-88-5-400-300-0-ffffff.jpg?v=1635100609',
    link: '/aktuality/ceny-komodit'
  },
  {
    id: 'vyvoj-cien-styrcon-u',
    title: 'Vývoj cien Styrcon-u / Styrcon price development',
    description: 'Cenová stabilita STYRCON oproti konkurencii. Dlhodobá stratégia a prínos kvalitných zatepľovacích systémov pre zákazníkov.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/vyvoj-cien-styrcon-u---styrcon-price-development-e-news-89-5-400-300-0-ffffff.jpg?v=1635349264',
    link: '/aktuality/vyvoj-cien-styrcon-u'
  }
];

export function AktualityClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  // Defer search term for better performance during typing
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Memoize expensive filtering operation
  const filteredCards = useMemo(() => {
    return resourceCards.filter(card => {
      const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
      const matchesSearch = card.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
                           card.description.toLowerCase().includes(deferredSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, deferredSearchTerm]);

  // Smooth category transitions
  const handleCategoryChange = (categoryId: string) => {
    startTransition(() => {
      setActiveCategory(categoryId);
    });
  };

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
              STYRCON Blog
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Technické články, praktické rady a odborné informácie o zatepľovaní a sanácii budov s STYRCON riešeniami.
            </p>
            
            {/* Search Section */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Hľadať články..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
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
                onClick={() => handleCategoryChange(category.id)}
                disabled={isPending}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          {/* Show loading state when search is deferred */}
          {searchTerm !== deferredSearchTerm && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                Hľadá sa "{searchTerm}"...
              </p>
            </div>
          )}

          <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-200 ${
            searchTerm !== deferredSearchTerm ? 'opacity-70' : 'opacity-100'
          }`}>
            {filteredCards.map((card) => (
              <Link key={card.id} href={card.link} className="group cursor-pointer block">
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
                  
                  <div className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors text-sm">
                    Čítať viac
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
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