import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateOrderSummary } from '../utils/calculations';
import { computeFlightTrajectory } from '../utils/flight';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cup2eat_order_box_v1', []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const [cartBumpKey, setCartBumpKey] = useState(0);
  const cartTargetRef = useRef(null);
  const { showToast } = useToast();

  const launchFlight = useCallback((image, sourceEl) => {
    const endRect = cartTargetRef.current?.getBoundingClientRect();
    const startRect = sourceEl?.getBoundingClientRect?.();
    const trajectory = computeFlightTrajectory(startRect, endRect);

    if (!trajectory || !image) {
      setCartBumpKey((k) => k + 1);
      return false;
    }

    const flightId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setFlights((prev) => [...prev.slice(-4), { id: flightId, image, trajectory }]);

    window.setTimeout(() => {
      setCartBumpKey((k) => k + 1);
      setFlights((prev) => prev.filter((f) => f.id !== flightId));
    }, 520);

    return true;
  }, []);

  const addItem = useCallback(
    (product, pack, capacity, boxes = 1, sourceEl = null) => {
      const key = `${product.id}__${pack.id}__${capacity}`;
      const packTotal = pack.qty * pack.unitPrice;
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, boxes: i.boxes + boxes } : i
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            productName: product.name,
            image: product.image,
            packId: pack.id,
            packLabel: pack.label,
            cupsPerBox: pack.qty,
            unitPrice: pack.unitPrice,
            packTotal,
            capacity,
            boxes,
          },
        ];
      });

      launchFlight(product.image, sourceEl);
      showToast(`Added ${product.name} (${pack.label}) to Order Box`);
    },
    [setItems, showToast, launchFlight]
  );

  const updateBoxes = useCallback(
    (key, nextBoxes) => {
      if (nextBoxes <= 0) {
        setItems((prev) => prev.filter((item) => item.key !== key));
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.key === key ? { ...item, boxes: nextBoxes } : item))
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (key) => {
      setItems((prev) => prev.filter((item) => item.key !== key));
      showToast('Removed pack from Order Box');
    },
    [setItems, showToast]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    showToast('Order Box cleared');
  }, [setItems, showToast]);

  const summary = useMemo(() => calculateOrderSummary(items), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        drawerOpen,
        setDrawerOpen,
        cartTargetRef,
        flights,
        cartBumpKey,
        addItem,
        updateBoxes,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
