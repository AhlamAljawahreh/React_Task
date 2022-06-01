import React, { useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Reducers/Login";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
         const state = useSelector((state) => {
           return {
             isLoggedIn: state.loginReducer.isLoggedIn,
             token: state.loginReducer.token,
             user_id: state.loginReducer.user_id,
             role: state.loginReducer.role,
           };
         });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/home">
          Market
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Stores{" "}
              </a>
            </li>
            {state.role == 1?<li className="nav-item">
              <a className="nav-link" href="/new_store">
                New Store
              </a>
            </li>:<></>}
            <li className="nav-item">
              <a
                className="nav-link active text fw-bolder float-right"
                href=""
                onClick={() => {
                  dispatch(logout());
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
