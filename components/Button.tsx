import type { JSX } from 'preact';

export type ButtonProps = JSX.ButtonHTMLAttributes;

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class='btn'
    />
  );
}
