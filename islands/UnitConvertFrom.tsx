import { type Signal } from '@preact/signals';
import { For } from '@preact/signals/utils';
import { Select } from '../components/Select.tsx';

type UnitFromConvertProps = {
  fromConvert: Signal<Array<{ value: string; label: string }>>;
  fromConvertSelected: Signal<string>;
};

export function UnitConvertFrom(
  { fromConvert, fromConvertSelected }: UnitFromConvertProps,
) {
  return (
    <Select
      name='unitFromConvert'
      label='Unit to Convert from'
      selected={fromConvertSelected}
    >
      <For
        each={fromConvert}
        fallback={<option value=''>No units available</option>}
      >
        {(unit) => <option value={unit.value}>{unit.label}</option>}
      </For>
    </Select>
  );
}
