import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
}

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * useSessionStorage - Session-based storage with React state synchronization
 * Provides persistent state that lasts for the browser session
 *
 * @param key - Storage key
 * @param initialValue - Initial value or function that returns initial value
 * @param options - Configuration options for serialization and initialization
 * @returns Tuple with current value, setter function, and remove function
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseSessionStorageOptions<T> = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithValue = true
  } = options;

  // Store initial value in ref to prevent recreating on every render
  const initialValueRef = useRef(initialValue);
  const serializerRef = useRef(serializer);
  const deserializerRef = useRef(deserializer);

  // Update refs if values change
  initialValueRef.current = initialValue;
  serializerRef.current = serializer;
  deserializerRef.current = deserializer;

  // Get initial value from sessionStorage or use provided initial value
  const getInitialValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return typeof initialValueRef.current === 'function'
        ? (initialValueRef.current as () => T)()
        : initialValueRef.current;
    }

    try {
      const item = sessionStorage.getItem(key);
      if (item !== null) {
        return deserializerRef.current(item);
      }
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
    }

    return typeof initialValueRef.current === 'function'
      ? (initialValueRef.current as () => T)()
      : initialValueRef.current;
  }, [key]); // Only depend on key, not the values that change

  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize state only once
    if (initializeWithValue && typeof window !== 'undefined') {
      return getInitialValue();
    }
    return typeof initialValueRef.current === 'function'
      ? (initialValueRef.current as () => T)()
      : initialValueRef.current;
  });

  // Update sessionStorage when state changes
  const setValue = useCallback((value: SetValue<T>) => {
    try {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value;
      setStoredValue(newValue);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, serializerRef.current(newValue));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove item from sessionStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key);
      }
      const resetValue = typeof initialValueRef.current === 'function'
        ? (initialValueRef.current as () => T)()
        : initialValueRef.current;
      setStoredValue(resetValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === sessionStorage) {
        try {
          if (e.newValue === null) {
            const resetValue = typeof initialValueRef.current === 'function'
              ? (initialValueRef.current as () => T)()
              : initialValueRef.current;
            setStoredValue(resetValue);
          } else {
            setStoredValue(deserializerRef.current(e.newValue));
          }
        } catch (error) {
          console.warn(`Error parsing sessionStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Note: Initialization is now handled in useState initializer to prevent re-renders

  return [storedValue, setValue, removeValue];
}