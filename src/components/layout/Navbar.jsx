import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { BRAND } from '../../data/brand';
import { useCart } from '../../context/CartContext';
import { BrandLogo } from './BrandLogo';
import './layout.css';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { summary, setDrawerOpen, cartTargetRef, cartBumpKey } = useCart();
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="site-announcement">
        <span>
          <strong>{BRAND.fssaiLabel}</strong> · 100% Edible · Pure Veg · Vegan Friendly ·{' '}
          <span>{BRAND.positioningBar.join(' | ')}</span>
        </span>
      </div>

      <div className="container site-nav-row">
        <Link to="/" className="site-brand" onClick={() => setMobileOpen(false)}>
          <BrandLogo size={44} />
          <div className="site-brand-wordmark">
            <span className="site-brand-title">{BRAND.name}</span>
            <span className="site-brand-sub">{BRAND.tagline}</span>
          </div>
        </Link>

        <nav className="site-nav-links" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={`site-nav-link ${isActive ? 'site-nav-link--active' : ''}`.trim()}
                style={{ position: 'relative' }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      right: '10px',
                      bottom: '-2px',
                      height: '2px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--color-gold-600)',
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="site-nav-actions">
          <motion.button
            ref={cartTargetRef}
            key={cartBumpKey}
            type="button"
            className="cart-trigger"
            initial={cartBumpKey > 0 ? { scale: 1.18 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 460, damping: 18 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDrawerOpen(true)}
            aria-label={`Open Order Box with ${summary.totalBoxes} packs`}
          >
            <ShoppingBag size={16} aria-hidden="true" />
            <span>Order Box</span>
            <span className="cart-count-pill">{summary.totalBoxes}</span>
          </motion.button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-drawer-nav" aria-label="Mobile Navigation">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `site-nav-link ${isActive ? 'site-nav-link--active' : ''}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
