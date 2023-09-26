import CartButton from "../CartButton/CartButton";

import classes from "./Header.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>Foodies Hub</h1>
      <CartButton onClick={props.onShow} />
    </header>
  );
};

export default MainHeader;
