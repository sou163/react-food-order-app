import React from "react";

import classes from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";

const Image = (props) => {
  return (
    <div className={classes["main-image"]}>
      <img src={mealsImage} alt="An array of mouth-licking food items" />
    </div>
  );
};

export default Image;
