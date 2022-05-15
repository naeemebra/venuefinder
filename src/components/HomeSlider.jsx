import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./shared/Spinner";

export default function HomeSlider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(_ => {
    (async function () {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach(doc => {
        return listings.push({ id: doc.id, data: doc.data() });
      });

      setListings(listings);
      setLoading(false);
    })();
  }, []);

  const takeMe = (data, id) => navigate(`/category/${data.type}/${id}`);

  if (loading) return <Spinner />;

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <div
          id="carouselExampleControlsD"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              onClick={_ => {
                const thisOne = listings[0];
                takeMe(thisOne.data, thisOne.id);
              }}
            >
              <div
                style={{
                  background: `url(${listings[0].data.imgUrls[0]}) center`,
                  backgroundSize: "cover",
                  height: "15rem",
                }}
                className="d-block w-100 "
                // src={item.imgUrls[0]}
              >
                <p className="swiperSlideText">{listings[0].data.name}</p>
                <p className="swiperSlidePrice">
                  $
                  {listings[0].data.discountedPrice ??
                    listings[0].data.regularPrice}{" "}
                  {listings[0].data.type === "rent" && "/ month"}
                </p>
              </div>
            </div>

            {listings.map(
              ({ data, id }, index) =>
                index !== 0 && (
                  <div
                    key={id}
                    className="carousel-item"
                    onClick={_ => takeMe(data, id)}
                  >
                    <div
                      style={{
                        background: `url(${data.imgUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                        height: "15rem",
                      }}
                      className="d-block w-100 "
                      // src={item.imgUrls[0]}
                    >
                      <p className="swiperSlideText">{data.name}</p>
                      <p className="swiperSlidePrice">
                        ${data.discountedPrice ?? data.regularPrice}{" "}
                        {data.type === "rent" && "/ month"}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsD"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsD"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </>
    )
  );
}
