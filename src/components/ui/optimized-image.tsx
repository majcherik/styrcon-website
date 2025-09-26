/**
 * Optimized Image Component for Slovak STYRCON Website
 * Advanced Next.js Image optimization for thermal insulation business
 * Focus on product galleries, technical diagrams, and Slovak business content
 */

import Image, { ImageProps } from 'next/image'
import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
  // STYRCON-specific optimization props
  productType?: 'styrcon' | 'polytex' | 'technical' | 'certificate' | 'gallery'
  businessPriority?: 'critical' | 'important' | 'normal' | 'lazy'
  slovakAltText?: string // Additional Slovak alt text for SEO
  // Performance optimization props
  blurDataURL?: string
  placeholder?: 'blur' | 'empty'
  quality?: number
  // Slovak business context
  technicalSpecs?: boolean // For technical specification images
  certification?: boolean  // For certification images
  galleryImage?: boolean   // For product gallery images
  // Accessibility enhancements
  loadingStrategy?: 'eager' | 'lazy' | 'priority'
  // Error handling
  fallbackSrc?: string
  onLoadingComplete?: () => void
  onError?: () => void
}

/**
 * Advanced Image Optimization for Slovak STYRCON Products
 */
export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    productType = 'gallery',
    businessPriority = 'normal',
    slovakAltText,
    blurDataURL,
    placeholder = 'blur',
    quality,
    technicalSpecs = false,
    certification = false,
    galleryImage = false,
    loadingStrategy,
    fallbackSrc = '/images/styrcon-placeholder.jpg',
    onLoadingComplete,
    onError,
    className,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(src)

    // Determine optimal quality based on product type and business priority
    const getOptimizedQuality = (): number => {
      if (quality) return quality

      switch (productType) {
        case 'styrcon':
        case 'polytex':
          return businessPriority === 'critical' ? 90 : 80
        case 'technical':
          return 85 // High quality for technical specifications
        case 'certificate':
          return 95 // Highest quality for certifications
        case 'gallery':
          return 75 // Balanced for gallery images
        default:
          return 75
      }
    }

    // Determine loading strategy based on business priority
    const getLoadingStrategy = (): 'eager' | 'lazy' => {
      if (loadingStrategy) return loadingStrategy === 'priority' ? 'eager' : loadingStrategy

      switch (businessPriority) {
        case 'critical':
          return 'eager'
        case 'important':
          return 'lazy'
        default:
          return 'lazy'
      }
    }

    // Generate Slovak business-optimized blur placeholder
    const getBlurPlaceholder = (): string => {
      if (blurDataURL) return blurDataURL

      // Slovak business color scheme placeholder
      const styrconBlue = '#1e40af'
      const styrconGray = '#64748b'

      return `data:image/svg+xml;base64,${Buffer.from(
        `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${styrconBlue};stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:${styrconGray};stop-opacity:0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${styrconGray}" font-size="16" font-family="Inter, sans-serif">
            ${productType === 'styrcon' ? 'STYRCON' : productType === 'polytex' ? 'POLYTEX' : 'Načítava...'}
          </text>
        </svg>`
      ).toString('base64')}`
    }

    // Handle image loading states
    const handleLoadingComplete = () => {
      setIsLoading(false)
      onLoadingComplete?.()
    }

    const handleError = () => {
      setHasError(true)
      setCurrentSrc(fallbackSrc)
      setIsLoading(false)
      onError?.()
    }

    // Generate comprehensive alt text for Slovak SEO
    const getOptimizedAltText = (): string => {
      let optimizedAlt = alt

      if (slovakAltText) {
        optimizedAlt += ` | ${slovakAltText}`
      }

      // Add Slovak business context
      switch (productType) {
        case 'styrcon':
          optimizedAlt += ' | STYRCON paropriepustné tepelnoizolačné dosky | E-MA SK'
          break
        case 'polytex':
          optimizedAlt += ' | POLYTEX tepelná izolácia | E-MA SK'
          break
        case 'technical':
          optimizedAlt += ' | Technické špecifikácie | E-MA SK'
          break
        case 'certificate':
          optimizedAlt += ' | Certifikát | E-MA SK'
          break
      }

      return optimizedAlt
    }

    // Determine sizes based on product type for responsive optimization
    const getResponsiveSizes = (): string => {
      switch (productType) {
        case 'styrcon':
        case 'polytex':
          return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        case 'technical':
          return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw'
        case 'certificate':
          return '(max-width: 640px) 100vw, 70vw'
        case 'gallery':
          return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
        default:
          return '100vw'
      }
    }

    const optimizedClassName = cn(
      // Base styling
      'transition-opacity duration-300',
      // Loading states
      isLoading && 'opacity-0',
      !isLoading && 'opacity-100',
      // Business-specific styling
      technicalSpecs && 'border border-gray-200 rounded-lg shadow-sm',
      certification && 'border-2 border-blue-100 rounded-lg shadow-md',
      galleryImage && 'hover:scale-105 transition-transform duration-300',
      // Error state
      hasError && 'opacity-75 grayscale',
      className
    )

    return (
      <div className="relative">
        <Image
          ref={ref}
          src={currentSrc}
          alt={getOptimizedAltText()}
          quality={getOptimizedQuality()}
          loading={getLoadingStrategy()}
          priority={businessPriority === 'critical'}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? getBlurPlaceholder() : undefined}
          sizes={props.sizes || getResponsiveSizes()}
          className={optimizedClassName}
          onLoad={handleLoadingComplete}
          onError={handleError}
          {...props}
        />

        {/* Loading overlay for critical business images */}
        {isLoading && businessPriority === 'critical' && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-sm text-gray-500 font-medium">
              {productType === 'styrcon' ? 'Načítava STYRCON...' :
               productType === 'polytex' ? 'Načítava POLYTEX...' :
               'Načítava...'}
            </div>
          </div>
        )}

        {/* Error state for Slovak users */}
        {hasError && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
            Obrázok sa nepodarilo načítať
          </div>
        )}
      </div>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

/**
 * Specialized STYRCON Product Image Component
 */
interface STYRCONProductImageProps extends Omit<OptimizedImageProps, 'productType'> {
  product: 'styrcon-basic' | 'styrcon-plus' | 'styrcon-200' | 'polytex-standard'
}

export function STYRCONProductImage({
  product,
  businessPriority = 'important',
  ...props
}: STYRCONProductImageProps) {
  const productType = product.startsWith('styrcon') ? 'styrcon' : 'polytex'

  const productNames = {
    'styrcon-basic': 'STYRCON Basic - Paropriepustné tepelnoizolačné dosky',
    'styrcon-plus': 'STYRCON Plus - Vylepšené paropriepustné dosky',
    'styrcon-200': 'STYRCON 200 - Nehorľavé zatepľovacie dosky',
    'polytex-standard': 'POLYTEX Standard - Flexibilné tepelnoizolačné materiály'
  }

  return (
    <OptimizedImage
      productType={productType}
      businessPriority={businessPriority}
      slovakAltText={productNames[product]}
      technicalSpecs={true}
      {...props}
    />
  )
}

/**
 * Gallery Image Component for STYRCON Projects
 */
interface GalleryImageProps extends Omit<OptimizedImageProps, 'productType' | 'galleryImage'> {
  projectType?: 'residential' | 'commercial' | 'industrial' | 'historic'
}

export function STYRCONGalleryImage({
  projectType = 'residential',
  ...props
}: GalleryImageProps) {
  const projectTypesSlovak = {
    'residential': 'Rodinné domy',
    'commercial': 'Komerčné budovy',
    'industrial': 'Priemyselné objekty',
    'historic': 'Historické budovy'
  }

  return (
    <OptimizedImage
      productType="gallery"
      businessPriority="normal"
      galleryImage={true}
      slovakAltText={`Projekt STYRCON - ${projectTypesSlovak[projectType]}`}
      {...props}
    />
  )
}

export default OptimizedImage