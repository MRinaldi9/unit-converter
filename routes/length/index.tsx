import { useSignal } from '@preact/signals';
import { page } from 'fresh';
import { Input } from '../../components/Input.tsx';
import type { LengthUnit } from '../../server/length.ts';
import { define } from '../../utils.ts';
import { UnitConvertFrom } from './(_islands)/UnitConvertFrom.tsx';
import { UnitConvertTo } from './(_islands)/UnitConvertTo.tsx';
import { STATUS_CODE } from '@std/http/status';
import { ResultConversion } from '../../components/ResultConversion.tsx';

export const handler = define.handlers({
  async GET(ctx) {
    ctx.state.title = 'Length Conversion';
    const data = await fetch(`${ctx.url.origin}/api${ctx.route}`);
    const json = await data.json() as { value: LengthUnit; label: string }[];
    json.unshift({ value: '' as LengthUnit, label: 'Select a unit' });
    return {
      data: { message: '', units: json },
    };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const length = form.get('length');
    const fromUnit = form.get('unitFromConvert');
    const toUnit = form.get('unitToConvert');
    if (!length || !fromUnit || !toUnit) {
      return page({
        message:
          'You must select a length, a unit to convert from, and a unit to convert to.',
        units: [],
      }, { status: STATUS_CODE.BadRequest });
    }
    const data = await fetch(`${ctx.url.origin}/api/convert-length`, {
      method: 'POST',
      body: JSON.stringify({
        value: length,
        from: fromUnit,
        to: toUnit,
      }),
    });
    const result = await data.json();

    return ctx.render(
      <ResultConversion {...result} />,
    );
  },
});

export default define.page<typeof handler>((ctx) => {
  const { data: { message, units } } = ctx;
  const fromConvert = useSignal(units);
  const fromConvertSelected = useSignal('');

  return (
    <form class='w-1/2 flex flex-col gap-3' method='post'>
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
      <div class='flex gap-2'>
        <button
          type='submit'
          class='btn btn-primary'
        >
          Convert
        </button>
        {message && <a href='/length' class='btn btn-secondary'>Reset</a>}
      </div>
      {message && <small class='text-red-500'>{message}</small>}
    </form>
  );
});
