import React from "react";
import { useSelector } from "react-redux";
import "./Home.scss";

function Home() {
  const url = "https://bit.ly/3bWrLJ2";
  const name = useSelector((state) => state.userName.value);

  return (
    <div className="home" style={{ backgroundImage: `url(${url})` }}>
      <h1>Hello{name ? ", " + name + "!" : "!"}</h1>
    </div>
  );
}

export default Home;
