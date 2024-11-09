import Link from 'next/link';

function Navbar() {
  return (
      <nav>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
      </nav>
   
  );
}