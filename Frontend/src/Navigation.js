import React from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import "./Navigation.css";

/** Navigation
 * 
 * Props: 
 *  - currentUser {username, firstName, lastName, email,... }
 * 
 * State: 
 *  - none
 * 
 * App -> Navigation
 */

function Navigation({ currentUser }) {

  console.log("Navigation currentUser", currentUser)

  //returns navigation links depending on whether the currentUser state is populated
  function getNavLinks(currentUser) {

    if (currentUser === null || currentUser === undefined) {

      return (<>
        <Nav.Item as="li">
          <NavLink className="nav-link" exact to="/login">
            Login
            </NavLink>
        </Nav.Item>

        <Nav.Item as="li">
          <NavLink className="nav-link" exact to="/signup">
            Sign Up
            </NavLink>
        </Nav.Item></>
      );

    } else {

      return (
        <>
          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/companies">
              Companies
              </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/jobs">
              Jobs
              </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/profile">
              Profile
              </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink className="nav-link" exact to="/logout">
              Log Out
              </NavLink>
          </Nav.Item></>
      );

    }
  }

  return (
    <Nav as="ul" variant="tabs" className="Navigation Nav justify-content-center">
      <Nav.Item as="li">
        <NavLink className="nav-link" exact to="/">
          Jobly
          </NavLink>
      </Nav.Item>
      {getNavLinks(currentUser)}
    </Nav>
  );
}

export default Navigation;