import { useState, useCallback } from 'react';

export type ToggleValue = boolean | string | number;

export interface UseToggleOptions<T extends ToggleValue> {
  onToggle?: (value: T) => void;
}

export function useToggle<T extends ToggleValue = boolean>(
  initialValue: T,
  options?: UseToggleOptions<T>
): [T, () => void, (value: T) => void];

export function useToggle(
  initialValue?: boolean,
  options?: UseToggleOptions<boolean>
): [boolean, () => void, (value: boolean) => void];

export function useToggle<T extends ToggleValue>(
  initialValue: T | boolean = false,
  options: UseToggleOptions<T> = {}
) {
  const { onToggle } = options;
  const [state, setState] = useState<T>((initialValue ?? false) as T);

  const toggle = useCallback(() => {
    const newValue = (typeof state === 'boolean' ? !state : !Boolean(state)) as T;
    setState(newValue);
    onToggle?.(newValue);
  }, [state, onToggle]);

  const setValue = useCallback((value: T) => {
    setState(value);
    onToggle?.(value);
  }, [onToggle]);

  return [state, toggle, setValue] as const;
}