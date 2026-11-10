import { Link } from 'react-router-dom';
import { Instagram, Leaf, ShieldCheck, ArrowUpRight, RotateCcw } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { BrandLogo } from './BrandLogo';
import './layout.css';

export function Footer({ onReplayIntro }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <BrandLogo size={52} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-gold-300)' }}>
                  {BRAND.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-cream-200)' }}>
                  {BRAND.ethos}
                </div>
              </div>
            </div>
            <p className="script-accent" style={{ fontSize: '1.85rem', color: 'var(--color-gold-300)', marginBottom: 'var(--space-2)' }}>
              {BRAND.closingScript}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-cream-200)', maxWidth: '34ch', marginBottom: 'var(--space-4)' }}>
              {BRAND.closingCopy}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="ui-btn ui-btn--outline-light ui-btn--sm"
              >
                <Instagram size={15} aria-hidden="true" />
                <span>Follow {BRAND.handle}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="ui-btn ui-btn--outline-light ui-btn--sm"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Replay Intro</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Our Range</h3>
            <ul className="footer-links">
              <li><Link to="/products/chocolate-coated">Chocolate Coated (₹20/cup)</Link></li>
              <li><Link to="/products/elaichi">Elaichi Cardamom Cup</Link></li>
              <li><Link to="/products/chocolate">Chocolate Biscuit Cup</Link></li>
              <li><Link to="/products/vanilla">Vanilla Wafer Cup</Link></li>
              <li><Link to="/products/brownie-party-bundle">Birthday Brownie Combo</Link></li>
              <li><Link to="/products/assorted-taster">All-4 Flavour Tasting Box</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links">
              <li><Link to="/products">All Edible Cups</Link></li>
              <li><Link to="/catering">Café & Bulk Wholesale</Link></li>
              <li><Link to="/sustainability">Sustainability & Impact</Link></li>
              <li><Link to="/about">Our Story & Reels</Link></li>
              <li><Link to="/contact">FAQ & Direct Inquiry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Standards & Dispatch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-cream-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-gold-300)', flexShrink: 0 }} aria-hidden="true" />
                <span>{BRAND.fssaiLabel} · Pure Veg · Vegan Friendly</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Leaf size={16} style={{ color: 'var(--color-gold-300)', flexShrink: 0 }} aria-hidden="true" />
                <span>Zero plastic or PE paper lining</span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'rgba(250, 246, 238, 0.78)' }}>
                {BRAND.orderChannelNote}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {BRAND.name}. Eat Your Drink. All rights reserved.</span>
          <span>EDIBLE CUPS · REAL FLAVOURS · A GREENER PLANET</span>
        </div>
      </div>
    </footer>
  );
}
