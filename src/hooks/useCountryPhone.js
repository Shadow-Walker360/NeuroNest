import { useState, useCallback } from 'react';
import { COUNTRY_CODES, getEducationSystem } from '../utils/countryData.js';

/**
 * useCountryPhone
 * ────────────────
 * Manages phone input state with automatic country + education system detection.
 *
 * Usage:
 *   const {
 *     dialValue,        // "+254|KE" — combined dial+country string for <select>
 *     phone,            // raw phone number string
 *     dialCode,         // "+254"
 *     countryCode,      // "KE"
 *     detectedCountry,  // full country object { code, country, flag, name }
 *     educationSystem,  // full education system object for detected country
 *     setDialValue,     // call when dial <select> changes
 *     setPhone,         // call when phone <input> changes
 *     reset,            // reset all to defaults
 *   } = useCountryPhone(initialCountry);
 */
export default function useCountryPhone(initialCountryCode = 'KE') {
  const initialCountry = COUNTRY_CODES.find(c => c.country === initialCountryCode)
    || COUNTRY_CODES[0];

  const [dialValue, _setDialValue] = useState(
    `${initialCountry.code}|${initialCountry.country}`
  );
  const [phone, setPhone]           = useState('');
  const [detectedCountry, setDetected] = useState(initialCountry);

  // When user changes the dial code selector
  const setDialValue = useCallback((val) => {
    _setDialValue(val);
    const [code, cc] = val.split('|');
    const found = COUNTRY_CODES.find(c => c.code === code && c.country === cc);
    if (found) setDetected(found);
  }, []);

  const dialCode    = dialValue.split('|')[0];
  const countryCode = dialValue.split('|')[1];
  const educationSystem = detectedCountry
    ? getEducationSystem(detectedCountry.country)
    : null;

  /** Full phone string suitable for backend: e.g. "+254712345678" */
  const fullPhone = `${dialCode}${phone.replace(/\s+/g, '')}`;

  const reset = useCallback(() => {
    _setDialValue(`${initialCountry.code}|${initialCountry.country}`);
    setPhone('');
    setDetected(initialCountry);
  }, [initialCountry]);

  return {
    dialValue,
    phone,
    dialCode,
    countryCode,
    fullPhone,
    detectedCountry,
    educationSystem,
    setDialValue,
    setPhone: (e) => setPhone(typeof e === 'string' ? e : e.target.value),
    reset,
    // Convenience: all country codes for the <select> dropdown
    countryCodes: COUNTRY_CODES,
  };
}