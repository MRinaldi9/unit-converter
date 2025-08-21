import { JSX } from 'preact/compat/jsx-dev-runtime';

type InputProps = JSX.InputHTMLAttributes & {
  label: string;
};

export function Input({ label, ...rest }: InputProps) {
  return (
    <fieldset class='fieldset'>
      <legend class='fieldset-legend'>{label}</legend>
      <input class='input' {...rest} />
    </fieldset>
  );
}
