import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChang = e => {
    setFormData(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });

      console.log(user);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header className="pageHeader">
          <p>Sign up Now!</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="name"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChang}
            />

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

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
              </button>
            </div>
          </form>
          {/* Google Auth  */}
          <Link to="/sign-in" className="registerLink">
            Sign In instead
          </Link>{" "}
          j
        </main>
      </div>
    </>
  );
}
