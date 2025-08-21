import { PageProps } from 'fresh';
import { Navbar } from '../components/Navbar.tsx';

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <header class='navbar bg-primary prose prose-headings:text-primary-content prose-headings:m-0 prose-a:no-underline prose-a:text-primary-content max-w-none'>
        <a
          href='/'
          class='flex gap-3'
          aria-label='Navigate to home'
        >
          <img
            class='not-prose'
            src='/logo.svg'
            width='40'
            height='40'
            alt='the Fresh logo: a sliced lemon dripping with juice'
          />
          <h1>Unit Converter</h1>
        </a>

        <Navbar />
      </header>

      <main class='container mx-auto pt-8 flex justify-center'>
        <Component />
      </main>
    </>
  );
}
