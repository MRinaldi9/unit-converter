import { computed, type Signal } from '@preact/signals';
import { For } from '@preact/signals/utils';
import { Select } from '../../../components/Select.tsx';
type UnitToConvertProps = {
  fromConvert: Signal<Array<{ value: string; label: string }>>;
  fromConvertSelected: Signal<string>;
};

export function UnitConvertTo(
  { fromConvert, fromConvertSelected }: UnitToConvertProps,
) {
  const toConvert = computed(() => {
    const fromUnit = fromConvert.peek();
    const fromUnitSelected = fromConvertSelected.value;
    if (fromUnitSelected === '') return fromUnit;
    return fromUnit.filter((unit) => unit.value !== fromUnitSelected);
  });
  return (
    <Select
      name='unitToConvert'
      label='Unit to Convert to'
    >
      <For
        each={toConvert}
        fallback={<option value=''>No units available</option>}
      >
        {(unit) => <option value={unit.value}>{unit.label}</option>}
      </For>
    </Select>
  );
}
