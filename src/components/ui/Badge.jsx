import './ui.css';

/**
 * Semantic pill badge for dietary tags, certifications, and status labels.
 */
export function Badge({ children, tone = 'neutral', icon: Icon, className = '' }) {
  return (
    <span className={`ui-badge ui-badge--${tone} ${className}`.trim()}>
      {Icon && <Icon size={13} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}

