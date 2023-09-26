import { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const itemNumRef = useRef();

  // form validity state
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTotal = itemNumRef.current.value;
    const enteredTotalNum = +enteredTotal; // converting string to number

    if (
      enteredTotal.trim().length === 0 ||
      enteredTotalNum < 1 ||
      enteredTotalNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredTotalNum);
  };

  // using ref to pass the existing amount to child component
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={itemNumRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 to 5)!</p>}
    </form>
  );
};

export default MealItemForm;
