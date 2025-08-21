export type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';

// Fattori rispetto al metro
const toMeterFactor = {
  mm: 1e-3,
  cm: 1e-2,
  m: 1,
  km: 1e3,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
} as const;

/**
 * Converte un valore da una unità a metri.
 */
export function toMeters(value: number, unit: LengthUnit): number {
  validate(value, unit);
  return parseFloat((value * toMeterFactor[unit]).toFixed(2));
}

/**
 * Converte un valore in metri verso l'unità target.
 */
export function fromMeters(meters: number, target: LengthUnit): number {
  validate(meters, target);
  return parseFloat((meters / toMeterFactor[target]).toFixed(2));
}

/**
 * Converte tra due unità di lunghezza.
 * Esempio: convertLength(10, 'cm', 'mm') => 100
 */
export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit,
): number {
  if (from === to) return value;
  const m = toMeters(value, from);
  return fromMeters(m, to);
}

// Validazione basilare
function validate(value: number, unit: string): void {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError('Valore non numerico.');
  }
  if (!(unit in toMeterFactor)) {
    throw new Error(`Unità non supportata: ${unit}`);
  }
}
