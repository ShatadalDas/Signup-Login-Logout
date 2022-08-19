import React from "react";
import "./Navbar.scss";
import { logo } from "../../../assets";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../../../redux/slices/nameSlice.mjs";

function url(urlPos) {
  console.log(urlPos);
  switch (urlPos) {
    case "/":
      return "Home";
    case "/login":
      return "Login";
    case "/signup":
      return " Signup";
    default:
      return "";
  }
}

function Navbar() {
  const location = useLocation();
  const urlPos = location.pathname;
  const title = url(urlPos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.userName.value);

  function handleLogout() {
    navigate("/login");
    dispatch(updateName(""));
  }

  return (
    <nav className="navbar">
      <section className="navbar__left">
        <img className="navbar__left__logo" src={logo} alt="logo" />
        <h1 className="navbar__left__title">{title}</h1>
      </section>

      <section className="navbar__right">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Signup
        </NavLink>
        <div
          to="/login"
          className="navbar__right__logout"
          onClick={handleLogout}
          style={name ? {} : { display: "none" }}
        >
          Logout
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
