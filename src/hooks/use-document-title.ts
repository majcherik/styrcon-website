import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { useUnmount } from './use-unmount';

export type UseDocumentTitleOptions = {
  /**
   * Whether to preserve the title when the component unmounts.
   * @default true
   */
  preserveTitleOnUnmount?: boolean;
};

/**
 * useDocumentTitle
 *
 * A hook that dynamically sets the document title (browser tab title).
 * Captures the initial title and optionally restores it when the component unmounts.
 *
 * @param title - The title to set for the document
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * function ProductPage({ productName }) {
 *   useDocumentTitle(`${productName} | STYRCON`);
 *   return <div>{productName}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Restore previous title on unmount
 * function ModalComponent() {
 *   useDocumentTitle('Modal Open', { preserveTitleOnUnmount: false });
 *   return <div>Modal Content</div>;
 * }
 * ```
 */
export function useDocumentTitle(
  title: string,
  options: UseDocumentTitleOptions = {},
): void {
  const { preserveTitleOnUnmount = true } = options;
  const defaultTitle = useRef<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    defaultTitle.current = window.document.title;
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);

  useUnmount(() => {
    if (!preserveTitleOnUnmount && defaultTitle.current) {
      window.document.title = defaultTitle.current;
    }
  });
}
