import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import "./index.css";
import { globalContext } from "../app";
import { Button } from "../shared/button";
import axios from "axios";
import { appConfig } from "../app-config";
export const NavTopSide = ({ displaySidebar, handleSidebar }) => {
  const { user, setUser, openModal, setOpenModal } = useContext(globalContext);

  const handleSignIn = () => {
    if (user.auth) {
      return null;
    }
    handleSidebar(false);
    return setOpenModal(true);
  };

  const handleLogout = async () => {
    const logoutData = await axios.get(`${appConfig.url.api}/auth/logout`, {
      withCredentials: true,
    });
    if (logoutData.data.status) {
      setUser({ auth: false, username: "", _id: "" });
    }
  };
  return displaySidebar ? (
    <div className="nav-top-side">
      <div className="nav-top-side-username">
        <p onClick={handleSignIn}>
          {user.auth ? `Hi, ${user.username} !` : "SignIn"}
        </p>
      </div>

      <div className="nav-top-side-instruction">
        <p>Topics</p>
      </div>
      <div>
        <Link to={`?top=allpost`}>All</Link>
      </div>
      <div>
        <Link to={`?top=politics`}>Politics</Link>
      </div>
      <div>
        <Link to={`?top=sports`}>Sports</Link>
      </div>

      <div>
        <Link to="?top=entertainment"> Entertainment</Link>
      </div>
      <div>
        <Link to="?top=national"> National </Link>
      </div>
      <div>
        <Link to="?top=international"> International</Link>
      </div>
      <div>
        <Link to="?top=miscellaneous"> Miscellaneous</Link>
      </div>
      <div>
        <Link to="?top=scienceandtech">Science and Technology</Link>
      </div>

      {user.auth ? (
        <div className="nav-top-side-close">
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
      <div className="nav-top-side-close">
        <button onClick={() => handleSidebar(false)}>Close</button>
      </div>
    </div>
  ) : null;
};
