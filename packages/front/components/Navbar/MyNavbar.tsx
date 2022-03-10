/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { MyNavLink } from './MyNavLink';
import { NavDropDownItem } from './NavDropDownItem';
import { SessionBtn } from './SessionBtn';

import logo from '../../public/img/pir-logo.png';

export const MyNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-3"
      style={{ background: 'rgb(65,76,203)' }}
    >
      <div className="container-fluid">

        <a href="/">
          <Image
            src={logo}
            alt="padel-indoor-rubi-logo"
            width={255} height={90}
          />
        </a>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
            <li className="nav-item">
              <MyNavLink href="/" title="Inici" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/#2" title="Noticies" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/#3" title="Campionats" />
            </li>
            <li className="nav-item">
              <MyNavLink href="/bookings" title="Reserves" />
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
                <NavDropDownItem href="/openGames" title="Cerca companys!" />
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

          <SessionBtn />
        </div>
      </div>
    </nav>
  );
};
