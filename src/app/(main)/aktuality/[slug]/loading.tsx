import { Card } from '@/components/ui/card'

/**
 * Loading component for individual blog post pages
 * Provides better UX during article loading
 */
export default function Loading() {
  return (
    <div className="pt-16">
      {/* Breadcrumb skeleton */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Article content skeleton */}
      <article className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Article header skeleton */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-4 bg-blue-200 rounded w-24 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
          </div>

          {/* Article body skeleton */}
          <div className="prose prose-lg max-w-none animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="mb-6">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))}
          </div>

          {/* Tags skeleton */}
          <div className="mt-12 pt-8 border-t animate-pulse">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}