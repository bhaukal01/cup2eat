import './ui.css';

/**
 * Surface container card with optional padding and hover lift.
 */
export function Card({
  children,
  padded = false,
  interactive = false,
  surface = false,
  as: Component = 'div',
  className = '',
  ...props
}) {
  const classes = [
    'ui-card',
    padded ? 'ui-card--padded' : '',
    interactive ? 'ui-card--interactive' : '',
    surface ? 'ui-card--surface' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

