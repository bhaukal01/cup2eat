import { describe, it, expect } from 'vitest';
import {
  isValidPhone,
  validateBulkQuoteForm,
  validateContactForm,
} from './validators';

describe('validators', () => {
  it('validates 10-digit Indian phone numbers with optional +91 prefix', () => {
    expect(isValidPhone('9876543210')).toBe(true);
    expect(isValidPhone('+91 98765-43210')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
    expect(isValidPhone('')).toBe(false);
  });

  it('rejects incomplete bulk quote submission and reports field errors', () => {
    const errors = validateBulkQuoteForm({
      name: 'A',
      businessName: '',
      email: 'invalid-email',
      phone: '999',
      quantity: '20',
      city: '',
    });

    expect(errors.name).toBeTruthy();
    expect(errors.businessName).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.quantity).toBeTruthy();
    expect(errors.city).toBeTruthy();
  });

  it('passes valid bulk quote and contact forms', () => {
    const bulkErrors = validateBulkQuoteForm({
      name: 'Rohan Sharma',
      businessName: 'Chai Junction',
      email: 'rohan@chaijunction.in',
      phone: '9876543210',
      quantity: '500',
      city: 'Delhi',
    });
    expect(bulkErrors).toEqual({});

    const contactErrors = validateContactForm({
      name: 'Meera',
      email: 'meera@example.com',
      phone: '',
      message: 'Looking for a tasting box of Chocolate Coated and Elaichi cups.',
    });
    expect(contactErrors).toEqual({});
  });

  it('catches short message and bad optional phone on contact form', () => {
    const errors = validateContactForm({
      name: 'Meera',
      email: 'meera@example.com',
      phone: '123',
      message: 'Hi',
    });
    expect(errors.phone).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });
});

