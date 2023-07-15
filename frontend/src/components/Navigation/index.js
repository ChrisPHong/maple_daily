import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="full-nav-container">
        <div
          className="logo-container"
          onClick={() => {
            history.push("/");
          }}
        >
          LOGO
        </div>

        <div className="Nav-right-container">
          <div className="nav-Link-Div">
            <NavLink className="navlink-span" exact to="/">
              Home
            </NavLink>
          </div>
          <div className="nav-Link-Div">
            <NavLink className="navlink-span" exact to="/About">
              About
            </NavLink>
          </div>
          <div className="nav-Link-Div">
            <NavLink className="navlink-span" exact to="/loadCharacter">
              Add Character
            </NavLink>
          </div>
          <div className="nav-Link-Div">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="full-nav-container">
          <div
            className="logo-container"
            onClick={() => {
              history.push("/");
            }}
          >
            LOGO
          </div>

          <div className="Nav-right-container">
            <div className="nav-Link-Div">
              <NavLink className="navlink-span" exact to="/">
                Home
              </NavLink>
            </div>
            <div className="nav-Link-Div">
              <NavLink className="navlink-span" exact to="/About">
                About
              </NavLink>
            </div>
            <div className="nav-Link-Div">
              <NavLink className="navlink-span" to="/signup">
                Sign Up
              </NavLink>
            </div>
            <div className="nav-Link-Div farthest-right">
              <NavLink className="navlink-span" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
