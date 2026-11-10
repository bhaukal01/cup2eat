import { useState, useEffect } from 'react';

/**
 * Safe persistent state wrapper around window.localStorage.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore storage quota or private-mode errors gracefully
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

