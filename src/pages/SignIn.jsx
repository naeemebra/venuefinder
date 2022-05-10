import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import GAuth from "../components/GAuth";
import Spinner from "../components/shared/Spinner";
// import { async } from "@firebase/util";

export default function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const onChang = e => {
    setFormData(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Bad Credentials");
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className="pageContainer">
        <header className="pageHeader">
          <p>Welcome Back!</p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
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
          <GAuth />
          <Link to="/sign-up" className="registerLink">
            Sign Up instead
          </Link>{" "}
          j
        </main>
      </div>
    </>
  );
}
