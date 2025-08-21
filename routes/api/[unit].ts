import { STATUS_CODE } from '@std/http/status';
import { define } from '../../utils.ts';

const unitMap = {
  length: [
    { value: 'mm', label: 'Millimeter' },
    { value: 'cm', label: 'Centimeter' },
    { value: 'm', label: 'Meter' },
    { value: 'km', label: 'Kilometer' },
    { value: 'mi', label: 'Mile' },
    { value: 'in', label: 'Inch' },
    { value: 'ft', label: 'Foot' },
    { value: 'yd', label: 'Yard' },
  ],
  weight: ['milligram', 'gram', 'kilogram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
};

export const handler = define.handlers({
  GET(ctx) {
    const slug = ctx.params.unit;
    if (slug !== 'length' && slug !== 'weight' && slug !== 'temperature') {
      return new Response('Not Found', { status: STATUS_CODE.BadRequest });
    }
    return new Response(JSON.stringify(unitMap[slug]), {
      status: STATUS_CODE.OK,
    });
  },
});
