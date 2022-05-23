import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingsItem";

export default function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();

  const { name, email } = formData;

  useEffect(
    _ => {
      (async function () {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );

        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      })();
    },
    [auth.currentUser.uid]
  );

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

  const deleteListing = async listingId => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        listing => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  const editListing = listingId => navigate(`/edit-listing/${listingId}`);

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
          <p>Add a venue</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map(listing => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => deleteListing(listing.id)}
                  onEdit={() => editListing(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
