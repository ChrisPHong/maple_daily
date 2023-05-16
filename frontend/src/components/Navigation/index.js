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
            <NavLink exact to="/">
              Home
            </NavLink>
          </div>
          <div className="nav-Link-Div">
            <NavLink exact to="/About">
              About
            </NavLink>
          </div>
          <div className="nav-Link-Div">
            <NavLink to="/lists">Lists</NavLink>
          </div>
          <div className="nav-Link-Div">
            <NavLink exact to="/createlist">
              Create List
            </NavLink>
          </div>
          <div className="nav-Link-Div farthest-right">
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
              <NavLink exact to="/">
                Home
              </NavLink>
            </div>
            <div className="nav-Link-Div">
              <NavLink exact to="/About">
                About
              </NavLink>
            </div>
            <div className="nav-Link-Div">
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
            <div className="nav-Link-Div farthest-right">
              <LoginFormModal />
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </div>
        <LoginFormModal />
      </>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
