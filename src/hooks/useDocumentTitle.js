import { useEffect } from 'react';

/**
 * Sets page document title consistently for accessibility and browser history.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | CUP2EAT` : 'CUP2EAT | Eat Your Drink';
  }, [title]);
}

