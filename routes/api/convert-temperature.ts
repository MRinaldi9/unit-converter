import { TemperatureUnit } from '../../models/units.ts';
import { define } from '../../utils.ts';

export interface TemperatureConversionInput {
  value: number;
  from: TemperatureUnit;
  to: TemperatureUnit;
}

export interface TemperatureErrorResult {
  success: false;
  error: string;
}

// Funzioni base
export const celsiusToFahrenheit = (c: number) => (c * 9) / 5 + 32;
export const fahrenheitToCelsius = (f: number) => ((f - 32) * 5) / 9;
export const celsiusToKelvin = (c: number) => c + 273.15;
export const kelvinToCelsius = (k: number) => k - 273.15;
export const fahrenheitToKelvin = (f: number) =>
  celsiusToKelvin(fahrenheitToCelsius(f));
export const kelvinToFahrenheit = (k: number) =>
  celsiusToFahrenheit(kelvinToCelsius(k));

// Mappa conversioni dirette
const directMap: Record<string, (v: number) => number> = {
  'C:F': celsiusToFahrenheit,
  'F:C': fahrenheitToCelsius,
  'C:K': celsiusToKelvin,
  'K:C': kelvinToCelsius,
  'F:K': fahrenheitToKelvin,
  'K:F': kelvinToFahrenheit,
};

function convertTemperature(
  { from, to, value }: TemperatureConversionInput,
): number {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error('Valore non valido');
  }
  if (from === to) return value;

  // Validazioni fisiche
  if (from === 'K' && value < 0) {
    throw new Error('La temperatura in Kelvin non può essere negativa');
  }
  if (from === 'C' && value < -273.15) {
    throw new Error('Temperatura sotto lo zero assoluto (-273.15 °C)');
  }
  if (from === 'F' && value < -459.67) {
    throw new Error('Temperatura sotto lo zero assoluto (-459.67 °F)');
  }

  const key = `${from}:${to}`;
  const fn = directMap[key];
  if (!fn) {
    throw new Error(`Conversione non supportata: ${from} -> ${to}`);
  }
  return fn(value);
}

export const handler = define.handlers({
  async POST(ctx) {
    const { value: valueRaw, from, to } = await ctx.req.json();
    validateUnit(from);
    validateUnit(to);
    const value = Number(valueRaw);
    const result = convertTemperature({ value, from, to });
    return Response.json({
      from: { value, unit: from },
      to: { value: result, unit: to },
    });
  },
});

function validateUnit(u: unknown): asserts u is TemperatureUnit {
  if (u !== 'C' && u !== 'F' && u !== 'K') {
    throw new Error('Unità non valida (usa C, F, K)');
  }
}
