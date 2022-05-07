import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

export default function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();

  const { name, email } = formData;

  const handleLogOut = _ => {
    auth.signOut();
    navigate("/");
  };

  const handleSubmit = async _ => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update user in firestore
        const userRefference = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRefference, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const handleChange = e =>
    setFormData(prevState => ({ ...prevState, [e.target.id]: e.target.value }));

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={handleLogOut}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Information</p>
          <p
            className="changePersonalDetails"
            onClick={_ => {
              changeDetails && handleSubmit();
              setChangeDetails(prevState => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              disabled={!changeDetails}
              className={!changeDetails ? "profileName" : "profileNameActive"}
            />
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleChange}
              disabled={true}
              className={"profileEmail"}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  );
}
