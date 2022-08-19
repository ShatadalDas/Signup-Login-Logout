import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateName } from "../../../redux/slices/nameSlice.mjs";
import { useDispatch } from "react-redux";
import "./Signup.scss";
import axios from "axios";
const imgUrl = "https://bit.ly/3Asivp7";

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phn, setPhn] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const [isPhnValid, setState] = useState(true);

  const [emailAlert, setEmailAlert] = useState("");
  let allow = fname && lname && email && pass && cpass && cpass === pass;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (allow) {
      axios
        .post("http://localhost:4000/api/signup", {
          fname,
          lname,
          email,
          phn,
          pass,
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data) {
            setEmailAlert("* already signed up with this email");
            if (
              window.confirm(
                "Already signed up with this email, Would you like to login instead ?"
              )
            ) {
              navigate("/login");
            }
          } else {
            dispatch(updateName(fname));
            navigate("/");
          }
        });
    }
  }

  return (
    <>
      <title>Signup</title>
      <div className="signup" style={{ backgroundImage: `url(${imgUrl})` }}>
        <form onSubmit={handleSubmit} className="signup__box">
          <section className="signup__box__fname">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              maxLength={20}
              onKeyPress={(e) => {
                if (
                  !/[A-Z]/.test(e.key) &&
                  !/[a-z]/.test(e.key) &&
                  e.key !== " "
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => setFname(e.target.value)}
            />
          </section>

          <section className="signup__box__lname">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              maxLength={20}
              onInput={(e) => setLname(e.target.value)}
            />
          </section>

          <section className="signup__box__email">
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
              onInput={(e) => setEmail(e.target.value)}
            />
            <small>{emailAlert}</small>
          </section>

          <section className="signup__box__phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key) && phn.length > 0) {
                  setState(false);
                  e.preventDefault();
                } else {
                  setState(true);
                }
              }}
              onInput={(e) => setPhn(e.target.value)}
              maxLength={10}
            />
            <small>{isPhnValid ? "" : "* 0-9 numbers only"}</small>
          </section>

          <section className="signup__box__pass">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onInput={(e) => setPass(e.target.value)}
            />
            <small className={pass.length >= 8 ? "strong" : ""}>
              ✓ strong enough
            </small>
            <small
              className={pass.length < 8 && pass.length >= 5 ? "moderate" : ""}
            >
              * moderate strong
            </small>
            <small className={pass.length < 5 && pass.length > 0 ? "weak" : ""}>
              * quite weak
            </small>
          </section>

          <section className="signup__box__cpass">
            <label htmlFor="cpassword">Confrim Password</label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              onInput={(e) => setCpass(e.target.value)}
            />
            <small>
              {pass !== cpass && pass.length && cpass.length
                ? "* password & confirm password must be same"
                : ""}
            </small>
          </section>

          <section className="signup__box__btns">
            <input type="reset" value="Reset" />
            <button disabled={!allow}>Signup</button>
          </section>
        </form>
      </div>
    </>
  );
}

export default Signup;
