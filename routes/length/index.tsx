import { useSignal } from '@preact/signals';
import { define } from '../../utils.ts';
import { UnitConvertFrom } from './(_islands)/UnitConvertFrom.tsx';
import { UnitConvertTo } from './(_islands)/UnitConvertTo.tsx';
import { Input } from '../../components/Input.tsx';

export const handler = define.handlers({
  async GET(ctx) {
    ctx.state.title = 'Length Conversion';
    const data = await fetch(`http://localhost:8000/api${ctx.route}`);
    const json = await data.json() as string[];
    json.unshift('');
    return {
      data: Iterator.from(json).map((unit) => ({
        value: unit,
        label: unit !== '' ? unit : 'Select a unit',
      })).toArray(),
    };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();

    return Response.redirect(new URL('/length/result', ctx.url.origin), 303);
  },
});

export default define.page<typeof handler>((ctx) => {
  const { data: units } = ctx;
  const fromConvert = useSignal(units);
  const fromConvertSelected = useSignal('');

  return (
    <form class='w-1/2' method='post'>
      <Input
        name='length'
        label='Enter the length to convert'
        type='number'
        autoComplete='off'
      />
      <UnitConvertFrom
        fromConvert={fromConvert}
        fromConvertSelected={fromConvertSelected}
      />
      <UnitConvertTo
        fromConvert={fromConvert}
        fromConvertSelected={fromConvertSelected}
      />
      <button type='submit' class='btn btn-primary mt-6'>Convert</button>
    </form>
  );
});
