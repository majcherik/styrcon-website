import { useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';

interface UseStepReturn {
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  reset: () => void;
  setStep: Dispatch<SetStateAction<number>>;
}

/**
 * useStep - Multi-step process management
 * Handles step navigation with automatic boundary checking
 *
 * @param maxStep - Maximum number of steps (1-based indexing)
 * @returns Tuple with current step and navigation controls
 */
export function useStep(maxStep: number): [number, UseStepReturn] {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Memoized boolean flags for navigation state
  const canGoToNextStep = useMemo(() => currentStep < maxStep, [currentStep, maxStep]);
  const canGoToPrevStep = useMemo(() => currentStep > 1, [currentStep]);

  // Memoized navigation functions
  const goToNextStep = useCallback(() => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, maxStep));
  }, [maxStep]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  // Enhanced setStep with boundary clamping
  const setStepWithBounds = useCallback<Dispatch<SetStateAction<number>>>(
    (step) => {
      setCurrentStep(prevStep => {
        const newStep = typeof step === 'function' ? step(prevStep) : step;
        return Math.max(1, Math.min(newStep, maxStep));
      });
    },
    [maxStep]
  );

  const stepControls: UseStepReturn = {
    canGoToNextStep,
    canGoToPrevStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep: setStepWithBounds
  };

  return [currentStep, stepControls];
}

/**
 * Helper function to get step progress percentage
 * Useful for progress bars and indicators
 */
export function getStepProgress(currentStep: number, maxStep: number): number {
  if (maxStep <= 0) return 0;
  return Math.round((currentStep / maxStep) * 100);
}

/**
 * Helper function to check if step is valid
 * Useful for validation before navigation
 */
export function isValidStep(step: number, maxStep: number): boolean {
  return step >= 1 && step <= maxStep && Number.isInteger(step);
}

/**
 * useStepWithValidation - Enhanced step hook with validation
 * Includes validation callback for step transitions
 */
export function useStepWithValidation(
  maxStep: number,
  validateStep?: (currentStep: number, nextStep: number) => boolean
): [number, UseStepReturn & { isValidTransition: (nextStep: number) => boolean }] {
  const [currentStep, stepControls] = useStep(maxStep);

  const isValidTransition = useCallback(
    (nextStep: number) => {
      if (!isValidStep(nextStep, maxStep)) return false;
      if (validateStep) return validateStep(currentStep, nextStep);
      return true;
    },
    [currentStep, maxStep, validateStep]
  );

  const enhancedGoToNextStep = useCallback(() => {
    if (isValidTransition(currentStep + 1)) {
      stepControls.goToNextStep();
    }
  }, [currentStep, isValidTransition, stepControls]);

  const enhancedGoToPrevStep = useCallback(() => {
    if (isValidTransition(currentStep - 1)) {
      stepControls.goToPrevStep();
    }
  }, [currentStep, isValidTransition, stepControls]);

  const enhancedSetStep = useCallback<Dispatch<SetStateAction<number>>>(
    (step) => {
      const newStep = typeof step === 'function' ? step(currentStep) : step;
      if (isValidTransition(newStep)) {
        stepControls.setStep(step);
      }
    },
    [currentStep, isValidTransition, stepControls]
  );

  return [
    currentStep,
    {
      ...stepControls,
      goToNextStep: enhancedGoToNextStep,
      goToPrevStep: enhancedGoToPrevStep,
      setStep: enhancedSetStep,
      isValidTransition
    }
  ];
}