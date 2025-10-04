import { useState, useCallback } from 'react';

interface UseBooleanReturn {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

/**
 * useBoolean - Enhanced boolean state management
 * Provides helper methods for common boolean operations
 *
 * @param defaultValue - Initial boolean value (defaults to false)
 * @returns Object with value and state manipulation methods
 */
export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prevValue => !prevValue), []);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle
  };
}