import { useState } from 'react';

export interface CopyToClipboardResult {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
  isSupported: boolean;
}

export const useCopyToClipboard = (): CopyToClipboardResult => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Check if clipboard API is supported
  const isSupported = typeof window !== 'undefined' && !!navigator?.clipboard?.writeText;

  const copy = async (text: string): Promise<boolean> => {
    if (!text) {
      console.warn('Copy failed: No text provided');
      return false;
    }

    // Modern clipboard API
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn('Copy failed with clipboard API', error);
      }
    }

    // Fallback for older browsers
    if (typeof window !== 'undefined' && document) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopiedText(text);
          return true;
        }
      } catch (error) {
        console.warn('Copy failed with fallback method', error);
      }
    }

    setCopiedText(null);
    return false;
  };

  const reset = () => {
    setCopiedText(null);
  };

  return {
    copiedText,
    copy,
    reset,
    isSupported,
  };
};