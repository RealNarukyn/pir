/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';

interface IProps {
  href: string;
  title: string;
};

export const NavDropDownItem: React.FC<IProps> = ({ href, title }) => {
  return (
    <li>
      <Link href={href}>
        <span style={{ cursor: 'pointer' }} className="dropdown-item">{title.toUpperCase()}</span>
      </Link>
    </li>
  );
};
