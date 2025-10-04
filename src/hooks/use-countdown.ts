import { useCallback } from 'react';
import { useCounter } from './use-counter';
import { useBoolean } from './use-boolean';
import { useInterval } from './use-interval';

type CountdownOptions = {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
};

type CountdownControllers = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
};

/**
 * useCountdown - Configurable countdown timer
 * Supports both increment and decrement modes with start/stop/reset controls
 *
 * @param options - Countdown configuration options
 * @returns Tuple with current count and control methods
 */
export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart);

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  const resetCountdown = useCallback(() => {
    stopCountdown();
    resetCounter();
  }, [stopCountdown, resetCounter]);

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }
    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [count, { startCountdown, stopCountdown, resetCountdown }];
}