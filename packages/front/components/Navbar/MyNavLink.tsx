import React from 'react';
import Link from 'next/link';

interface IProps {
    active?: boolean;
    href: string;
    title: string;
};

export const MyNavLink:React.FC<IProps> = ({ active, href, title }) => {
  return (
    <Link href={href}>
      <span
        style={{ cursor: 'pointer', fontSize: '1.1em' }}
        className={active ? 'nav-link active' : 'nav-link'}
      >
        {title.toUpperCase()}
      </span>
    </Link>
  );
};
