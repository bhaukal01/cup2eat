import { Link } from 'react-router-dom';
import './ui.css';

/**
 * Reusable action button supporting link mode, sizes, variants, and loading states.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  to,
  href,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth ? 'ui-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className="ui-spinner" aria-hidden="true" />}
      <span className="ui-btn-inner">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}

