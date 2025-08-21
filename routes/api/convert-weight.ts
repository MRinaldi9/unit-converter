import { WeightUnit } from '../../models/units.ts';
import { define } from '../../utils.ts';

const WEIGHT_TO_GRAM: Record<WeightUnit, number> = {
  mg: 0.001, // 1 mg = 0.001 g
  g: 1, // 1 g = 1 g
  kg: 1000, // 1 kg = 1000 g
  lb: 453.59237, // 1 lb = 453.59237 g
  oz: 28.349523125, // 1 oz = 28.349523125 g
};

export class WeightConversionError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = 'WeightConversionError';
  }
}

function convertWeight(
  value: number,
  from: WeightUnit,
  to: WeightUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new WeightConversionError('Valore non numerico');
  }
  const grams = value * WEIGHT_TO_GRAM[from];
  return +((grams / WEIGHT_TO_GRAM[to]).toFixed(2));
}

function convertWeightRounded(
  value: number,
  from: WeightUnit,
  to: WeightUnit,
  decimals = 2,
): number {
  const r = convertWeight(value, from, to);
  const f = Math.pow(10, decimals);
  return Math.round(r * f) / f;
}

export const handler = define.handlers({
  async POST(ctx) {
    const { value, from, to } = await ctx.req.json();

    const result = convertWeightRounded(+value, from, to);

    return Response.json({
      from: {
        value: +value,
        unit: from,
      },
      to: {
        value: result,
        unit: to,
      },
    });
  },
});
