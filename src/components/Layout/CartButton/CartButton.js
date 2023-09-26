import { useContext, useEffect, useState } from "react";

import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const [highlightIcon, setHighlightIcon] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // adding the animation class if the cart state has changed
  const btnClasses = `${classes.button} ${highlightIcon ? classes.bump : ""}`;

  // using useEffect hook to play bump animation on cart button
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setHighlightIcon(true);

    // adding timeout to make the bump animation work repeatedly whenever items are added
    const timer = setTimeout(() => {
      setHighlightIcon(false);
    }, 300);

    // cleanup function of useEffect to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default CartButton;
