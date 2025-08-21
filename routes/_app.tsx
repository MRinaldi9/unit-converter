import { define } from '../utils.ts';

export default define.page(function App({ Component, state }) {
  const { title } = state;
  return (
    <html data-theme='nord'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title ? `${title} | Unit Converter` : 'Unit Converter'}</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
