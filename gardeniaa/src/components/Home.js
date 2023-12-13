import React from "react";
// import Navbar from "./Navbar";
import Navebar from "./Navbar/Navebar";

const Home = () => {
  return (
    <>
      <Navebar />
      <div
        className="d-flex flex-grow-1 justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h1 style={{ fontSize: "4rem" }}>
          <b>
            Welcome to <span style={{ color: "green" }}>Gardenia</span>
          </b>
        </h1>
      </div>
    </>
  );
};

export default Home;
