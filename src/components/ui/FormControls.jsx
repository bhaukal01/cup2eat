import { motion } from 'framer-motion';
import './ui.css';

function FieldWrapper({ id, label, required, helper, error, children }) {
  const describedBy = [error ? `${id}-error` : null, helper ? `${id}-helper` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ui-field">
      {label && (
        <label htmlFor={id} className="ui-label">
          <span>{label}</span>
          {required && (
            <span className="ui-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children(describedBy || undefined)}
      {helper && !error && (
        <span id={`${id}-helper`} className="ui-helper">
          {helper}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="ui-error-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/** Accessible labeled text input with inline validation. */
export function Input({ id, label, required, helper, error, className = '', ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} helper={helper} error={error}>
      {(describedBy) => (
        <input
          id={id}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`ui-control ${error ? 'ui-control--error' : ''} ${className}`.trim()}
          {...props}
        />
      )}
    </FieldWrapper>
  );
}

/** Accessible labeled select dropdown. */
export function Select({ id, label, required, helper, error, options = [], className = '', ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} helper={helper} error={error}>
      {(describedBy) => (
        <select
          id={id}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`ui-control ${error ? 'ui-control--error' : ''} ${className}`.trim()}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
}

/** Accessible labeled textarea with inline validation. */
export function Textarea({ id, label, required, helper, error, rows = 4, className = '', ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} helper={helper} error={error}>
      {(describedBy) => (
        <textarea
          id={id}
          rows={rows}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`ui-control ${error ? 'ui-control--error' : ''} ${className}`.trim()}
          {...props}
        />
      )}
    </FieldWrapper>
  );
}

/** Accessible checkbox control. */
export function Checkbox({ id, label, checked, onChange, error }) {
  return (
    <div className="ui-field">
      <label htmlFor={id} className="ui-check-row">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </label>
      {error && (
        <span className="ui-error-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/** Accessible pill radio group with smooth spring highlight slide. */
export function RadioGroup({ name, label, value, onChange, options = [] }) {
  return (
    <div className="ui-field" role="radiogroup" aria-label={label}>
      {label && <span className="ui-label">{label}</span>}
      <div className="ui-radio-group">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <label key={option.value} className="ui-radio-pill">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
              />
              <span style={{ position: 'relative', background: active ? 'transparent' : undefined, zIndex: 1 }}>
                {active && (
                  <motion.span
                    layoutId={`radio-pill-${name}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-forest-900)',
                      borderColor: 'var(--color-forest-900)',
                      zIndex: -1,
                      padding: 0,
                    }}
                  />
                )}
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

