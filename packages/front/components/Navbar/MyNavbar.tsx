import React from 'react';
import Link from 'next/link';
import { MyNavLink } from './MyNavLink';

import { NavDropDownItem } from './NavDropDownItem';


export const MyNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary p-3"
    >
      <div className="container-fluid">
        <Link href="/">
          <span style={{ cursor: 'pointer' }} className="navbar-brand">
            Padel Indoor Rubi
          </span>
        </Link>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <MyNavLink active href="/#1" title="Inici" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/#2" title="Noticies" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/#3" title="Campionats" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/#4" title="Reserves" />
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle" href="#"
                id="navbarScrollingDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"
              >
                JUGA!
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <NavDropDownItem href="/#5" title="Activitats" />
                <NavDropDownItem href="/#6" title="Cerca companys!" />
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle" href="#"
                id="navbarScrollingDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"
              >
                SOBRE NOSALTRES
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <NavDropDownItem href="/#7" title="El Club" />
                <NavDropDownItem href="/#8" title="Tarifes" />
                <NavDropDownItem href="/#9" title="Contacta amb nosaltres" />
              </ul>
            </li>

          </ul>

          <button>
            <a className="nav-link" href="/#0">ACCÉS USUARI</a>
          </button>
        </div>
      </div>
    </nav>
  );
};
