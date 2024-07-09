import React from 'react';
import Link from 'next/link';

interface NavLinksProps {
  links: string[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  return (
    <div className="flex items-center space-x-4">
      {links.map((link) => (
        <Link
          key={link}
          href="#"
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          {link}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
