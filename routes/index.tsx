import { define } from '../utils.ts';

export default define.page(function Home(_ctx) {
  return (
    <div class='max-w-screen-md mx-auto flex flex-col items-center justify-center'>
      <h1 class='text-4xl font-bold'>Welcome to Unit Converter</h1>
      <p class='my-4'>
        This is a simple unit converter application built with Fresh and based
        on the exceptional{' '}
        <a
          class='text-secondary hover:underline'
          href='https://roadmap.sh/'
          target='_blank'
          rel='noreferrer'
        >
          Roadmap Project
        </a>.
      </p>
    </div>
  );
});
