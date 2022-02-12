import { Icon, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const FOSNavbar = () => {

  const auth = useAuth();

  const [isBurgerActive, setisBurgerActive] = useState(false);

  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href="/">
          <img
            alt="Flow-over-stack"
            src={logo}
          />
        </Navbar.Item>
        <Navbar.Burger
          onClick={() => {
            setisBurgerActive(!isBurgerActive);
          }}
          role="button"
          className={`navbar-burger burger ${isBurgerActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="FOSNavbar"
        />
      </Navbar.Brand>

      <Navbar.Menu
        id="FOSNavbar"
        className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
      >
        <Navbar.Container className="navbar-start"  >

          <NavLink to="/"
            className={(navData) => (navData.isActive ? "navbar-item is-active" : 'navbar-item')}
          > Dalyvių sąrašas</NavLink>
          
        </Navbar.Container>

        <Navbar.Container align="end" className="navbar-end">


          {auth.token ? '' : (
            <NavLink to="/login"
              className={(navData) => (navData.isActive ? "navbar-item is-active" : 'navbar-item')}
            >Login</NavLink>
          )}

          {auth.token ? '' : (
            <NavLink to="/register"
              className={(navData) => (navData.isActive ? "navbar-item is-active" : 'navbar-item')}
            >Register</NavLink>
          )}

          {auth.token && (
            <Navbar.Item >
              <FontAwesomeIcon icon={faUser} />&nbsp;{auth.email}
            </Navbar.Item >
          )}

          {auth.token && (
            <Navbar.Item >
              <FontAwesomeIcon icon={faSignOutAlt}
                title="Logout"
                onClick={() => auth.logout()}
              />
            </Navbar.Item >
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar >
  );
};
