import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateImpactMetrics } from '../../utils/calculations';
import { formatCount } from '../../utils/formatters';
import { Button } from '../ui';
import { EditorialReveal } from '../motion/MotionPrimitives';
import './sections.css';

export function ImpactCalculator({ compact = false }) {
  const [dailyCups, setDailyCups] = useState(120);
  const [daysOpen, setDaysOpen] = useState(330);

  const metrics = useMemo(
    () => calculateImpactMetrics(dailyCups, daysOpen),
    [dailyCups, daysOpen]
  );

  return (
    <EditorialReveal>
      <div className="impact-editorial">
        <div>
          <span className="eyebrow">Plastic Elimination Estimator</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
            Calculate Your Yearly Zero-Waste Footprint
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)', marginBottom: 'var(--space-6)', maxWidth: '48ch' }}>
            Paper takeaway cups contain hidden polyethylene plastic liners that prevent ordinary recycling. Adjust your counter volume to see annual waste prevented.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4px', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                <label htmlFor="daily-cups-range">Cups served per day</label>
                <span style={{ color: 'var(--color-forest-900)' }}>{formatCount(dailyCups)} cups/day</span>
              </div>
              <input
                id="daily-cups-range"
                type="range"
                min="20"
                max="1000"
                step="10"
                value={dailyCups}
                onChange={(e) => setDailyCups(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-forest-900)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4px', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                <label htmlFor="days-open-range">Operating / Event days per year</label>
                <span style={{ color: 'var(--color-forest-900)' }}>{daysOpen} days/year</span>
              </div>
              <input
                id="days-open-range"
                type="range"
                min="1"
                max="365"
                step="1"
                value={daysOpen}
                onChange={(e) => setDaysOpen(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-forest-900)' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div className="impact-stats-strip">
            <div className="impact-stat-cell">
              <motion.div
                key={metrics.cupsReplacedAnnually}
                initial={{ opacity: 0.65, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="impact-stat-num"
              >
                {formatCount(metrics.cupsReplacedAnnually)}
              </motion.div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)', fontWeight: 600 }}>
                Disposable Cups Replaced / Yr
              </div>
            </div>
            <div className="impact-stat-cell">
              <motion.div
                key={metrics.wasteKgAvoided}
                initial={{ opacity: 0.65, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="impact-stat-num"
              >
                {metrics.wasteKgAvoided} kg
              </motion.div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)', fontWeight: 600 }}>
                PE-Lined Cup Landfill Saved
              </div>
            </div>
            <div className="impact-stat-cell">
              <motion.div
                key={metrics.binBagsSaved}
                initial={{ opacity: 0.65, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="impact-stat-num"
              >
                {formatCount(metrics.binBagsSaved)}
              </motion.div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)', fontWeight: 600 }}>
                Trash Bags Eliminated
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-forest-800)', marginBottom: '6px' }}>
              <span>Plastic Cup Displacement Scale</span>
              <span>{Math.min(100, Math.round((metrics.cupsReplacedAnnually / 365000) * 100))}% of Max Café Target</span>
            </div>
            <div className="decay-bar-track">
              <motion.div
                className="decay-bar-fill"
                style={{ backgroundColor: 'var(--color-forest-900)' }}
                animate={{ width: `${Math.min(100, Math.max(4, Math.round((metrics.cupsReplacedAnnually / 365000) * 100)))}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {!compact && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button to="/catering">Request Café Wholesale Quote</Button>
              <Button to="/sustainability" variant="outline">Material Breakdown</Button>
            </div>
          )}
        </div>
      </div>
    </EditorialReveal>
  );
}
