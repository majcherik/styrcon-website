'use client';

import { useState, useDeferredValue, useMemo, useTransition, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useHover } from '@/hooks/use-hover';
import { blogPosts } from '@/data/blog-posts';

interface ResourceCard {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  content: string; // Full article content for search
}

const categories = [
  { id: 'all', label: 'Všetko' },
  { id: 'technicke', label: 'Technické články' },
  { id: 'zateplovanie', label: 'Zatepľovanie' },
  { id: 'sanacia', label: 'Sanácia' },
  { id: 'prakticke', label: 'Praktické rady' }
];

// Generate resource cards from blogPosts with full content for search
const resourceCards: ResourceCard[] = Object.values(blogPosts).map(post => ({
  id: post.id,
  title: post.title,
  description: post.excerpt,
  category: post.category,
  image: post.image,
  link: `/aktuality/${post.id}`,
  content: post.content // Include full article content for search
}));

// Resource Card Component with hover effects
function ResourceCardComponent({ card }: { card: ResourceCard }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isHovered = useHover(cardRef);

  return (
    <Link
      key={card.id}
      href={card.link}
      ref={cardRef}
      className="group cursor-pointer block"
    >
      <div className={`relative aspect-[4/3] mb-4 overflow-hidden rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl scale-[1.02] ring-2 ring-primary/20' : 'shadow-md'
      }`}>
        <img
          src={card.image}
          alt={card.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-105'
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
          isHovered ? 'from-black/40 to-transparent' : 'from-black/20 to-transparent'
        }`} />
        {isHovered && (
          <div className="absolute inset-0 bg-primary/10 transition-opacity duration-300" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium uppercase tracking-wide transition-colors duration-200 ${
            isHovered ? 'text-primary' : 'text-slate-600'
          }`}>
            {categories.find(cat => cat.id === card.category)?.label}
          </span>
        </div>

        <h3 className={`text-lg font-semibold transition-all duration-200 line-clamp-2 ${
          isHovered ? 'text-primary scale-[1.02]' : 'text-slate-900 group-hover:text-primary'
        }`}>
          {card.title}
        </h3>

        <p className={`text-sm leading-relaxed line-clamp-3 transition-colors duration-200 ${
          isHovered ? 'text-slate-700' : 'text-slate-600'
        }`}>
          {card.description}
        </p>

        <div className={`inline-flex items-center font-medium transition-all duration-200 text-sm ${
          isHovered ? 'text-primary scale-105 translate-x-1' : 'text-primary group-hover:text-primary/80'
        }`}>
          Čítať viac
          <svg
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
              isHovered ? 'translate-x-1' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function AktualityClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const ITEMS_PER_PAGE = 6; // Show 6 articles per page

  // Defer search term for better performance during typing
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Memoize expensive filtering operation
  const filteredCards = useMemo(() => {
    return resourceCards.filter(card => {
      const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
      const searchLower = deferredSearchTerm.toLowerCase();

      // Search in title, description (excerpt), AND full article content
      const matchesSearch =
        card.title.toLowerCase().includes(searchLower) ||
        card.description.toLowerCase().includes(searchLower) ||
        card.content.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, deferredSearchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageCards = filteredCards.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, deferredSearchTerm]);

  // Smooth category transitions
  const handleCategoryChange = (categoryId: string) => {
    startTransition(() => {
      setActiveCategory(categoryId);
    });
  };

  // Handle page navigation
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              STYRCON Blog
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Technické články, praktické rady a odborné informácie o zatepľovaní a sanácii budov s STYRCON riešeniami.
            </p>
            
            {/* Search Section */}
            <div className="w-full max-w-2xl">
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
      <section className="border-b border-slate-200 bg-background">
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
      <section className="py-12 bg-background">
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
            {currentPageCards.map((card) => (
              <ResourceCardComponent key={card.id} card={card} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                Nenašli sa žiadne zdroje pre aktuálne kritériá vyhľadávania.
              </p>
            </div>
          )}

          {/* Pagination - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Predchádzajúca stránka"
                >
                  <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <span className="text-slate-500">Stránka</span>

                {/* Page Number Buttons */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-primary text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      aria-label={`Stránka ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Ďalšia stránka"
                >
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