import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();

  const {name, email} = formData

  const handleLogOut = _ => {
    auth.signOut();
    navigate("/" );
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={handleLogOut}>
          Logout
        </button>
      </header>
    </div>
  );
}
