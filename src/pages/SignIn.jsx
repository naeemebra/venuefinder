import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

export default function SignIn() {
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const onChang = e => {
    setFormData(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="pageContainer">
        <header className="pageHeader">
          <p>Welcome Back!</p>
        </header>

        <main>
          <form>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChang}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                className="passwordInput"
                value={password}
                onChange={onChang}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={_ => setShowPassword(prevState => !prevState)}
              />
            </div>

            <Link to={"/forgot-password"} className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
              </button>
            </div>
          </form>
          {/* Google Auth  */}
          <Link to="/sign-up" className="registerLink">
            Sign Up instead
          </Link>{" "}
          j
        </main>
      </div>
    </>
  );
}
