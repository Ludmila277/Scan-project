import React from "react";
import "./Main.css";
import About from "./About/About";
import WhyUs from "./WhyUs/WhyUs";
import Tariffs from "./Tariffs/Tariffs";


interface MainProps {
  isLoggedIn: boolean;
  userTariff: string | null;
}

const Main: React.FC<MainProps> = ({ isLoggedIn, userTariff }) => {
  return (
    <div className="main-content">
      <About isLoggedIn={isLoggedIn} />
      <WhyUs />
      <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  );
};

export default Main;
