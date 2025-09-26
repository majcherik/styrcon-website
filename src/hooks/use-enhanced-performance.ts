'use client'

import {
  useCallback,
  useMemo,
  useTransition,
  useDeferredValue,
  useOptimistic,
  useState,
  useEffect
} from 'react'

interface PerformanceOptions {
  enableTransitions?: boolean
  enableDeferredValues?: boolean
  enableOptimisticUpdates?: boolean
  debounceMs?: number
}

interface OptimisticAction<T> {
  id: string
  type: string
  data: T
  status: 'pending' | 'success' | 'error'
  timestamp: number
}

/**
 * Enhanced performance hook combining multiple React optimization patterns
 * Designed for STYRCON thermal insulation website performance
 */
export function useEnhancedPerformance<T = any>(
  options: PerformanceOptions = {}
) {
  const {
    enableTransitions = true,
    enableDeferredValues = true,
    enableOptimisticUpdates = true,
    debounceMs = 300
  } = options

  // Transition state for smooth UI updates
  const [isPending, startTransition] = enableTransitions
    ? useTransition()
    : [false, (fn: () => void) => fn()]

  // Search/filter state with deferred values
  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearchTerm = enableDeferredValues
    ? useDeferredValue(searchTerm)
    : searchTerm

  // Optimistic updates state
  const [optimisticActions, addOptimisticAction] = enableOptimisticUpdates
    ? useOptimistic<OptimisticAction<T>[], OptimisticAction<T>>(
        [],
        (state, newAction) => [...state, newAction]
      )
    : [[], () => {}]

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchTerm, debounceMs])

  // Enhanced search handler with transitions
  const handleSearch = useCallback((term: string) => {
    if (enableTransitions) {
      startTransition(() => {
        setSearchTerm(term)
      })
    } else {
      setSearchTerm(term)
    }
  }, [enableTransitions, startTransition])

  // Enhanced action handler with optimistic updates
  const handleOptimisticAction = useCallback(<ActionData>(
    type: string,
    data: ActionData,
    actionFn?: () => Promise<void>
  ) => {
    if (!enableOptimisticUpdates) {
      return actionFn?.()
    }

    const optimisticAction: OptimisticAction<ActionData> = {
      id: Date.now().toString(),
      type,
      data,
      status: 'pending',
      timestamp: Date.now()
    }

    addOptimisticAction(optimisticAction)

    return actionFn?.()
  }, [enableOptimisticUpdates, addOptimisticAction])

  // Memoized filter function for better performance
  const createFilter = useCallback(<Item>(
    items: Item[],
    filterFn: (item: Item, searchTerm: string) => boolean
  ) => {
    return useMemo(() => {
      const termToUse = enableDeferredValues ? deferredSearchTerm : debouncedSearchTerm
      return items.filter(item => filterFn(item, termToUse))
    }, [items, filterFn, enableDeferredValues, deferredSearchTerm, debouncedSearchTerm])
  }, [enableDeferredValues, deferredSearchTerm, debouncedSearchTerm])

  // Enhanced navigation handler
  const handleNavigation = useCallback((
    navigationFn: () => void,
    immediate = false
  ) => {
    if (immediate || !enableTransitions) {
      navigationFn()
    } else {
      startTransition(navigationFn)
    }
  }, [enableTransitions, startTransition])

  // Performance metrics
  const performanceMetrics = useMemo(() => ({
    isSearching: searchTerm !== deferredSearchTerm,
    hasOptimisticActions: optimisticActions.length > 0,
    pendingActionsCount: optimisticActions.filter(a => a.status === 'pending').length,
    isNavigating: isPending
  }), [searchTerm, deferredSearchTerm, optimisticActions, isPending])

  return {
    // Search functionality
    searchTerm,
    deferredSearchTerm,
    debouncedSearchTerm,
    handleSearch,

    // Navigation functionality
    isPending,
    startTransition,
    handleNavigation,

    // Optimistic updates
    optimisticActions,
    handleOptimisticAction,

    // Utilities
    createFilter,
    performanceMetrics,

    // Combined state
    isLoading: isPending || searchTerm !== deferredSearchTerm,
    isOptimizing: optimisticActions.length > 0
  }
}