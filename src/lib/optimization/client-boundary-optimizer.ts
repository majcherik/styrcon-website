/**
 * Client Boundary Optimization Utility for Slovak STYRCON Website
 * Analyzes and optimizes use client directive placement for better performance
 * Focuses on Slovak thermal insulation business components
 */

/**
 * Component analysis for client boundary optimization
 */
export interface ComponentAnalysis {
  filePath: string
  componentName: string
  hasClientDirective: boolean
  interactiveFeatures: string[]
  staticContent: string[]
  optimizationSuggestion: 'server-only' | 'client-required' | 'split-recommended'
  bundleImpact: 'low' | 'medium' | 'high'
  businessContext: 'core' | 'secondary' | 'auxiliary'
}

/**
 * Slovak business component categories for optimization priorities
 */
export const slovakBusinessPriorities = {
  core: [
    'contact-form',
    'product-configurator',
    'styrcon-calculator',
    'quote-request',
    'document-download'
  ],
  secondary: [
    'navigation',
    'search',
    'gallery',
    'slider',
    'carousel'
  ],
  auxiliary: [
    'animations',
    'scroll-effects',
    'progress-indicators',
    'tooltips'
  ]
} as const

/**
 * Analyze component for client boundary optimization
 */
export function analyzeComponent(
  filePath: string,
  content: string,
  componentName: string
): ComponentAnalysis {
  const hasClientDirective = content.includes("'use client'") || content.includes('"use client"')

  // Detect interactive features
  const interactiveFeatures: string[] = []
  if (content.includes('useState') || content.includes('useEffect')) {
    interactiveFeatures.push('React hooks')
  }
  if (content.includes('onClick') || content.includes('onSubmit') || content.includes('onChange')) {
    interactiveFeatures.push('Event handlers')
  }
  if (content.includes('motion.') || content.includes('framer-motion')) {
    interactiveFeatures.push('Animations')
  }
  if (content.includes('useForm') || content.includes('react-hook-form')) {
    interactiveFeatures.push('Form handling')
  }
  if (content.includes('window.') || content.includes('document.') || content.includes('localStorage')) {
    interactiveFeatures.push('Browser APIs')
  }

  // Detect static content
  const staticContent: string[] = []
  if (content.includes('STYRCON') || content.includes('paropriepustné')) {
    staticContent.push('Slovak business content')
  }
  if (content.includes('technické') || content.includes('špecifikácie')) {
    staticContent.push('Technical specifications')
  }
  if (content.includes('certifiká') || content.includes('normy')) {
    staticContent.push('Certifications')
  }

  // Determine business context
  let businessContext: ComponentAnalysis['businessContext'] = 'auxiliary'
  const lowerPath = filePath.toLowerCase()
  const lowerName = componentName.toLowerCase()

  if (
    slovakBusinessPriorities.core.some(priority =>
      lowerPath.includes(priority) || lowerName.includes(priority.replace('-', ''))
    )
  ) {
    businessContext = 'core'
  } else if (
    slovakBusinessPriorities.secondary.some(priority =>
      lowerPath.includes(priority) || lowerName.includes(priority.replace('-', ''))
    )
  ) {
    businessContext = 'secondary'
  }

  // Generate optimization suggestion
  let optimizationSuggestion: ComponentAnalysis['optimizationSuggestion'] = 'server-only'
  if (interactiveFeatures.length > 0) {
    if (interactiveFeatures.length >= 3 || interactiveFeatures.includes('Browser APIs')) {
      optimizationSuggestion = 'client-required'
    } else if (staticContent.length > 0) {
      optimizationSuggestion = 'split-recommended'
    } else {
      optimizationSuggestion = 'client-required'
    }
  }

  // Assess bundle impact
  let bundleImpact: ComponentAnalysis['bundleImpact'] = 'low'
  if (content.includes('framer-motion') || content.includes('three') || content.includes('gsap')) {
    bundleImpact = 'high'
  } else if (content.includes('react-hook-form') || content.includes('lucide-react')) {
    bundleImpact = 'medium'
  }

  return {
    filePath,
    componentName,
    hasClientDirective,
    interactiveFeatures,
    staticContent,
    optimizationSuggestion,
    bundleImpact,
    businessContext
  }
}

/**
 * Optimize component with client boundary recommendations
 */
export function generateOptimizationPlan(analysis: ComponentAnalysis[]): {
  highPriorityOptimizations: ComponentAnalysis[]
  mediumPriorityOptimizations: ComponentAnalysis[]
  lowPriorityOptimizations: ComponentAnalysis[]
  totalBundleReduction: string
} {
  const highPriorityOptimizations: ComponentAnalysis[] = []
  const mediumPriorityOptimizations: ComponentAnalysis[] = []
  const lowPriorityOptimizations: ComponentAnalysis[] = []

  analysis.forEach(component => {
    // High priority: Core business components with optimization potential
    if (component.businessContext === 'core' &&
        component.optimizationSuggestion === 'split-recommended') {
      highPriorityOptimizations.push(component)
    }
    // High priority: Unnecessary client directives on server-only components
    else if (component.hasClientDirective &&
             component.optimizationSuggestion === 'server-only') {
      highPriorityOptimizations.push(component)
    }
    // Medium priority: Secondary components with high bundle impact
    else if (component.businessContext === 'secondary' &&
             component.bundleImpact === 'high') {
      mediumPriorityOptimizations.push(component)
    }
    // Medium priority: Split recommendations for secondary components
    else if (component.businessContext === 'secondary' &&
             component.optimizationSuggestion === 'split-recommended') {
      mediumPriorityOptimizations.push(component)
    }
    // Low priority: Auxiliary components
    else {
      lowPriorityOptimizations.push(component)
    }
  })

  // Estimate bundle size reduction
  const highImpactCount = analysis.filter(c => c.bundleImpact === 'high').length
  const mediumImpactCount = analysis.filter(c => c.bundleImpact === 'medium').length
  const estimatedReduction = (highImpactCount * 50) + (mediumImpactCount * 20) // KB estimate

  return {
    highPriorityOptimizations,
    mediumPriorityOptimizations,
    lowPriorityOptimizations,
    totalBundleReduction: `${estimatedReduction}KB estimated`
  }
}

/**
 * Generate Slovak business-specific optimization recommendations
 */
export function generateSlovakBusinessRecommendations(
  component: ComponentAnalysis
): string[] {
  const recommendations: string[] = []

  // Core Slovak business component recommendations
  if (component.businessContext === 'core') {
    recommendations.push(
      `🇸🇰 Core Slovak business component - prioritize for optimal STYRCON user experience`
    )

    if (component.optimizationSuggestion === 'split-recommended') {
      recommendations.push(
        `📄 Split static Slovak content (technical specs, certifications) to server component`
      )
      recommendations.push(
        `⚡ Keep interactive features (quote forms, calculators) in client component`
      )
    }
  }

  // Technical content recommendations
  if (component.staticContent.includes('Technical specifications')) {
    recommendations.push(
      `📋 Technical specifications should be server-rendered for better SEO in Slovak market`
    )
  }

  // Form handling recommendations
  if (component.interactiveFeatures.includes('Form handling')) {
    recommendations.push(
      `📝 Consider server actions for Slovak business forms (contact, quote requests)`
    )
    recommendations.push(
      `🔒 Server-side validation essential for GDPR compliance in Slovakia`
    )
  }

  // Bundle optimization for Slovak users
  if (component.bundleImpact === 'high') {
    recommendations.push(
      `📦 High bundle impact - consider code splitting for better performance on Slovak connections`
    )
    recommendations.push(
      `🚀 Lazy load heavy components to improve Core Web Vitals for Slovak users`
    )
  }

  return recommendations
}

/**
 * Component split utility for Slovak business components
 */
export interface ComponentSplitPlan {
  serverComponent: {
    name: string
    content: string[]
    props: string[]
  }
  clientComponent: {
    name: string
    content: string[]
    props: string[]
  }
}

export function generateComponentSplitPlan(
  componentName: string,
  analysis: ComponentAnalysis
): ComponentSplitPlan {
  return {
    serverComponent: {
      name: `${componentName}Server`,
      content: analysis.staticContent,
      props: ['data', 'metadata', 'staticProps']
    },
    clientComponent: {
      name: `${componentName}Client`,
      content: analysis.interactiveFeatures,
      props: ['onAction', 'onChange', 'children']
    }
  }
}