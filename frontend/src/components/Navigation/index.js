import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="full-nav-container">
      <div className="logo-container">this is the logo for now</div>
      <div className="Nav-right-container">
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
        <div>
          <NavLink exact to="/createlist">
            Create List
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
