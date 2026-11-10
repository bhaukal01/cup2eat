import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { Skeleton } from './components/ui';
import { SmoothScrollProvider } from './components/motion/SmoothScrollProvider';
import { ScrollProgressBar } from './components/motion/MotionPrimitives';
import { FlyToCartLayer } from './components/motion/FlyToCartLayer';
import { PourPreloader } from './components/motion/PourPreloader';
import { CupCrestTransition } from './components/motion/CupCrestTransition';
import { TactileCursor } from './components/motion/TactileCursor';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const CateringBulkPage = lazy(() =>
  import('./pages/CateringBulkPage').then((m) => ({ default: m.CateringBulkPage }))
);
const SustainabilityPage = lazy(() =>
  import('./pages/SustainabilityPage').then((m) => ({ default: m.SustainabilityPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const FaqContactPage = lazy(() =>
  import('./pages/FaqContactPage').then((m) => ({ default: m.FaqContactPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function RouteFallback() {
  return (
    <div className="container section" aria-busy="true" aria-label="Loading page content">
      <Skeleton height="36px" width="45%" style={{ marginBottom: 'var(--space-4)' }} />
      <Skeleton height="220px" style={{ marginBottom: 'var(--space-6)' }} />
      <Skeleton height="120px" />
    </div>
  );
}

function AppShell() {
  const shouldReduceMotion = useReducedMotion();
  // Fires on direct initial load of ANY URL (/, /products, etc.) cleanly
  const [introOpen, setIntroOpen] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion && introOpen) {
      setIntroOpen(false);
    }
  }, [shouldReduceMotion, introOpen]);

  const finishIntro = useCallback(() => {
    setIntroOpen(false);
  }, []);

  const replayIntro = useCallback(() => {
    setIntroOpen(true);
  }, []);

  return (
    <Layout onReplayIntro={replayIntro}>
      <PourPreloader open={introOpen} onComplete={finishIntro} />
      <CupCrestTransition>
        {(displayLocation) => (
          <Suspense fallback={<RouteFallback />}>
            <Routes location={displayLocation}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/catering" element={<CateringBulkPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<FaqContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
      </CupCrestTransition>
    </Layout>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SmoothScrollProvider>
          <ToastProvider>
            <CartProvider>
              <ScrollProgressBar />
              <TactileCursor />
              <FlyToCartLayer />
              <AppShell />
            </CartProvider>
          </ToastProvider>
        </SmoothScrollProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
