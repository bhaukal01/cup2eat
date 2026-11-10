const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalize Indian phone digits and validate 10-digit mobile numbers (optional +91 prefix).
 */
export function isValidPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return true;
  if (digits.length === 12 && digits.startsWith('91')) return true;
  return false;
}

/**
 * Validate Catering / Bulk Wholesale quote form inputs.
 */
export function validateBulkQuoteForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!values.businessName || values.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your café, company, or event name.';
  }
  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian phone or WhatsApp number.';
  }
  const qty = Number(values.quantity);
  if (!Number.isFinite(qty) || qty < 50) {
    errors.quantity = 'Bulk inquiries start at 50 cups minimum.';
  }
  if (!values.city || values.city.trim().length < 2) {
    errors.city = 'Please enter delivery city & state.';
  }

  return errors;
}

/**
 * Validate general Contact / Sample inquiry form.
 */
export function validateContactForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit phone number or leave blank.';
  }
  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Please include a message (at least 10 characters).';
  }

  return errors;
}

