import { PageProps } from 'fresh';
import { Input } from './Input.tsx';
import { UnitConvertFrom } from '../islands/UnitConvertFrom.tsx';
import { UnitConvertTo } from '../islands/UnitConvertTo.tsx';
import { useSignal } from '@preact/signals';
import { Unit } from '../models/units.ts';

export function Page(
  ctx: PageProps<{
    message: string;
    units: {
      value: Unit;
      label: string;
    }[];
  }>,
) {
  const { data: { message, units } } = ctx;
  const fromConvert = useSignal(units);
  const fromConvertSelected = useSignal('');
  return (
    <form class='w-1/2 flex flex-col gap-3' method='post'>
      <Input
        name='value'
        label='Enter the value to convert'
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
        {message && (
          <a href={ctx.url.pathname} class='btn btn-secondary'>Reset</a>
        )}
      </div>
      {message && <small class='text-red-500'>{message}</small>}
    </form>
  );
}
