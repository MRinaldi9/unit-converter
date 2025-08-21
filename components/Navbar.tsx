export function Navbar() {
  const totalPaths = ['/length', '/weight', '/temperature'];
  return (
    <nav>
      <ul class='menu menu-horizontal'>
        {totalPaths.map((path) => (
          <li key={path}>
            <a
              href={path}
              class='data-[current]:underline'
            >
              {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
