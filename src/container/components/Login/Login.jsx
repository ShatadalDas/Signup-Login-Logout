import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateName } from "../../../redux/slices/nameSlice.mjs";
import { useDispatch } from "react-redux";

export default function Login() {
  const imgUrl = "https://bit.ly/3Arhspz";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");
  const allow = email && pass && !emailAlert && !passAlert;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (allow) {
      axios
        .post("http://localhost:4000/api/login", {
          email: email,
          password: pass,
        })
        .then((res) => {
          if (res.data.code === "1") {
            dispatch(updateName(res.data.name));
            navigate("/");
          } else if (res.data.code === "0") {
            setPassAlert("* wrong password");
          } else {
            setEmailAlert(res.data.msg);
            if (
              window.confirm(
                "Email not signed up, Would you like to signup instead ?"
              )
            ) {
              navigate("/signup");
            }
          }
        });
    }
  }

  return (
    <>
      <title>Login</title>
      <div className="login" style={{ backgroundImage: `url(${imgUrl})` }}>
        <form onSubmit={handleSubmit} className="login__box">
          <section className="login__box__email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onKeyPress={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  !/[a-z]/.test(e.key) &&
                  e.key !== "@" &&
                  e.key !== "."
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                setEmail(e.target.value);
                if (emailAlert === "* email isn't signed up") {
                  setEmailAlert("");
                }
              }}
            />
            <small>{emailAlert}</small>
          </section>

          <section className="login__box__password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onInput={(e) => {
                setPass(e.target.value);
                setPassAlert("");
              }}
            />
            <small>{passAlert}</small>
          </section>

          <div className="login__box__btns">
            <input type="reset" value="Reset" />
            <button disabled={!allow}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}
