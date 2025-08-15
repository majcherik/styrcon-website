'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Edit, Plus, Image, Video } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Produkty</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Produkty</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pridať produkt
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Žiadne produkty</h3>
          <p className="text-slate-500 mb-4">Začnite pridaním vašich prvých produktov</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Pridať produkt
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {product.name}
                </h3>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-4">
                  {product.images && product.images.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Image className="h-4 w-4" />
                      <span>{product.images.length}</span>
                    </div>
                  )}
                  {product.videos && product.videos.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>{product.videos.length}</span>
                    </div>
                  )}
                </div>
                <span>{new Date(product.created_at).toLocaleDateString('sk-SK')}</span>
              </div>

              {/* Technical Specs Preview */}
              {product.technical_specs && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-slate-900 mb-2">Technické parametre</h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    {Object.entries(product.technical_specs).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className="font-medium">
                          {typeof value === 'object' ? 'Object' : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}