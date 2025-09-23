import { useState, useEffect, useCallback, useRef } from 'react';

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncState<T, E = Error> {
  status: AsyncStatus;
  value: T | null;
  error: E | null;
}

export interface UseAsyncReturn<T, E = Error> extends AsyncState<T, E> {
  execute: () => Promise<void>;
  reset: () => void;
}

export function useAsync<T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncReturn<T, E> {
  const [state, setState] = useState<AsyncState<T, E>>({
    status: 'idle',
    value: null,
    error: null,
  });

  // Keep track of the current execution to prevent race conditions
  const activePromiseRef = useRef<Promise<T> | null>(null);

  const execute = useCallback(async () => {
    setState(prevState => ({
      ...prevState,
      status: 'pending',
      error: null,
    }));

    try {
      const promise = asyncFunction();
      activePromiseRef.current = promise;

      const response = await promise;

      // Only update state if this is still the active promise
      if (activePromiseRef.current === promise) {
        setState({
          status: 'success',
          value: response,
          error: null,
        });
        activePromiseRef.current = null;
      }
    } catch (error) {
      // Only update state if this promise is still active
      if (activePromiseRef.current !== null) {
        setState({
          status: 'error',
          value: null,
          error: error as E,
        });
        activePromiseRef.current = null;
      }
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    activePromiseRef.current = null;
    setState({
      status: 'idle',
      value: null,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    // Cleanup function to cancel any ongoing requests
    return () => {
      activePromiseRef.current = null;
    };
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}