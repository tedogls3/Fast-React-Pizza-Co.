/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

import Button from "../../ui/Button";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleDecreaseItemQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  function handleIncreaseItemQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecreaseItemQuantity}>
        -
      </Button>
      <span className="text-sm font-medium ">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseItemQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
