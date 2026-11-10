import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { ToastViewport } from './ToastViewport';

export function Layout({ children, onReplayIntro }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer onReplayIntro={onReplayIntro} />
      <CartDrawer />
      <ToastViewport />
    </>
  );
}
