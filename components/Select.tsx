import { JSX } from 'preact';
import { computed, useSignal } from '@preact/signals';
type SelectProps = JSX.SelectHTMLAttributes & {
  selectSize?: JSX.SignalLike<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  label: string;
  selected?: JSX.SignalLike<string>;
};

export function Select(
  { selectSize = useSignal<'md'>('md'), label, children, selected, ...rest }:
    SelectProps,
) {
  const sizeClass = computed(() => ({
    xs: 'select-xs',
    sm: 'select-sm',
    md: 'select-md',
    lg: 'select-lg',
    xl: 'select-xl',
  }[selectSize.value]));

  return (
    <fieldset class='fieldset'>
      <legend class='fieldset-legend'>{label}</legend>
      <select
        {...rest}
        class={`select ${sizeClass}`}
        onChange={(e) => selected && (selected.value = e.currentTarget.value)}
      >
        {children}
      </select>
    </fieldset>
  );
}
