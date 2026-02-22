// ── VALIDATORS ───────────────────────────────────────────

export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required.';
    }
    return null;
  },

  email: (value) => {
    if (!value) return 'Email is required.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return 'Enter a valid email address.';
    return null;
  },

  password: (value) => {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Include at least one number.';
    return null;
  },

  confirmPassword: (value, original) => {
    if (!value) return 'Please confirm your password.';
    if (value !== original) return 'Passwords do not match.';
    return null;
  },

  phone: (value) => {
    if (!value) return 'Phone number is required.';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 6) return 'Enter a valid phone number.';
    if (digits.length > 15) return 'Phone number is too long.';
    return null;
  },

  name: (value) => {
    if (!value || !value.trim()) return 'Name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  },

  minLength: (min) => (value) => {
    if (!value || value.length < min) return `Must be at least ${min} characters.`;
    return null;
  },
};

/**
 * Validate an entire form object against a schema.
 * schema: { fieldName: [validatorFn, ...] }
 * Returns { isValid, errors }
 */
export function validateForm(values, schema) {
  const errors = {};
  for (const field in schema) {
    const fns = schema[field];
    for (const fn of fns) {
      const result = fn(values[field], values);
      if (result) {
        errors[field] = result;
        break;
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}