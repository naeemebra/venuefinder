import React from "react";

export default function Slider({ item }) {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              style={{
                background: `url(${item.imgUrls[0]}) center`,
                backgroundSize: "cover",
                height: "15rem",
              }}
              className="d-block w-100 "
              alt=""
              // src={item.imgUrls[0]}
            />
          </div>
          {item.imgUrls.map(
            (_, index) =>
              index !== 0 && (
                <div key={index} className="carousel-item">
                  <img
                    style={{
                      background: `url(${item.imgUrls[index]}) center no-repeat`,
                      backgroundSize: "cover",
                      height: "15rem",
                    }}
                    className="d-block w-100 "
                    alt=""
                    // src={item.imgUrls[0]}
                  />
                </div>
              )
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
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
          data-bs-target="#carouselExampleControls"
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
  );
}
