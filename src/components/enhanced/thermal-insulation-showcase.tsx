'use client'

import { Suspense, useState } from 'react'
import { Search, Filter, Thermometer, Flame, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useEnhancedPerformance } from '@/hooks/use-enhanced-performance'

interface ThermalProduct {
  id: string
  name: string
  description: string
  fireResistance: string
  thermalConductivity: string
  vaporPermeability: string
  category: 'styrcon' | 'polytex' | 'accessories'
  image?: string
}

const thermalProducts: ThermalProduct[] = [
  {
    id: '1',
    name: 'STYRCON 200',
    description: 'Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1',
    fireResistance: 'A1',
    thermalConductivity: '0,041 W/mK',
    vaporPermeability: '≤ 3',
    category: 'styrcon',
    image: '/images/styrcon-200.jpg'
  },
  {
    id: '2',
    name: 'STYRCON 150',
    description: 'Základné tepelnoizolačné dosky pre obytné budovy',
    fireResistance: 'A1',
    thermalConductivity: '0,043 W/mK',
    vaporPermeability: '≤ 3',
    category: 'styrcon',
    image: '/images/styrcon-150.jpg'
  },
  {
    id: '3',
    name: 'POLYTEX Standard',
    description: 'Univerzálne tepelnoizolačné riešenie',
    fireResistance: 'B',
    thermalConductivity: '0,045 W/mK',
    vaporPermeability: '≤ 5',
    category: 'polytex',
    image: '/images/polytex-standard.jpg'
  }
]

function ProductFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <Card key={i} className="p-6 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-16 bg-slate-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/3"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function ThermalInsulationShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Enhanced performance hook combining all React optimizations
  const {
    searchTerm,
    handleSearch,
    handleNavigation,
    handleOptimisticAction,
    createFilter,
    performanceMetrics,
    isLoading,
    optimisticActions
  } = useEnhancedPerformance<ThermalProduct>({
    enableTransitions: true,
    enableDeferredValues: true,
    enableOptimisticUpdates: true,
    debounceMs: 300
  })

  // Optimized filtering with memoization and deferred values
  const filteredProducts = createFilter(
    thermalProducts,
    (product, searchTerm) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    }
  )

  // Enhanced category change with transitions
  const handleCategoryChange = (category: string) => {
    handleNavigation(() => {
      setSelectedCategory(category)
    })
  }

  // Enhanced product action with optimistic updates
  const handleProductAction = (product: ThermalProduct, action: string) => {
    handleOptimisticAction(
      `product-${action}`,
      product,
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(`${action} product:`, product.name)
      }
    )
  }

  return (
    <div className="space-y-8">
      {/* Performance Status Indicator */}
      {performanceMetrics.isSearching && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            Hľadá sa "{searchTerm}"... Zobrazujú sa predchádzajúce výsledky.
          </p>
        </div>
      )}

      {/* Optimistic Actions Display */}
      {optimisticActions.length > 0 && (
        <div className="space-y-2">
          {optimisticActions.map(action => (
            <div
              key={action.id}
              className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <p className="text-sm text-green-700">
                Spracováva sa akcia: {action.type} pre {action.data.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          STYRCON Tepelnoizolačné riešenia
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Hľadať produkty..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Všetko', icon: Filter },
            { id: 'styrcon', label: 'STYRCON', icon: Flame },
            { id: 'polytex', label: 'POLYTEX', icon: Thermometer },
            { id: 'accessories', label: 'Príslušenstvo', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(id)}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid with Suspense */}
      <Suspense fallback={<ProductFallback />}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
          isLoading ? 'opacity-70' : 'opacity-100'
        }`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>

                <p className="text-slate-600 text-sm">{product.description}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trieda nehorľavosti:</span>
                    <span className="font-medium">{product.fireResistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tepelná vodivosť:</span>
                    <span className="font-medium">{product.thermalConductivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paropriepustnosť:</span>
                    <span className="font-medium">{product.vaporPermeability}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleProductAction(product, 'view-details')}
                    className="flex-1"
                  >
                    Detaily
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProductAction(product, 'request-quote')}
                    className="flex-1"
                  >
                    Cenová ponuka
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Suspense>

      {/* No Results */}
      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Thermometer className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            Nenašli sa žiadne produkty
          </h3>
          <p className="text-slate-500">
            Skúste upraviť kritériá vyhľadávania alebo kategóriu
          </p>
        </div>
      )}
    </div>
  )
}