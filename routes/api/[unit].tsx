import { define } from '../../utils.ts';

const unitMap = {
  length: [
    'millimeter',
    'centimer',
    'meter',
    'kilometer',
    'mile',
    'inch',
    'foot',
    'yard',
  ],
  weight: ['milligram', 'gram', 'kilogram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
};

export const handler = define.handlers({
  GET(ctx) {
    const slug = ctx.params.unit;
    if (slug !== 'length' && slug !== 'weight' && slug !== 'temperature') {
      return new Response('Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(unitMap[slug]), { status: 200 });
  },
});
