import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../services/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useGetUserAddressQuery } from "../user/userApiSlice";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

function CreateOrder() {
  const [enteredValue, setEnteredValue] = useState({
    firstName: "",
    phoneNumber: "",
    address: "",
    priority: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { cart } = useSelector((state) => state.cart);

  const { data, isLoading: isAddressLoading } = useGetUserAddressQuery();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = enteredValue.priority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEnteredValue((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGetPosition = () => {
    if (!data) return;

    setEnteredValue((prevState) => ({
      ...prevState,
      address: data.address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      customer: enteredValue.firstName,
      phone: enteredValue.phoneNumber,
      address: enteredValue.address,
      priority: enteredValue.priority,
      cart,
    };
    try {
      const result = await createOrder(newOrder).unwrap();
      navigate(`/order/${result?.data.id}`);
      dispatch(clearCart());
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let`s go!</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-5 sm:items-center sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="firstName"
            value={enteredValue.firstName}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:items-center sm:flex-row">
          <label className="sm:basis-40">Phone number</label>

          <input
            type="tel"
            name="phoneNumber"
            value={enteredValue.phoneNumber}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:items-center sm:flex-row">
          <label className="sm:basis-40">Address</label>

          <input
            type="text"
            name="address"
            value={enteredValue.address}
            onChange={handleInputChange}
            className="input"
            required
          />
          <span className="absolute right-[3px] z-50">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                handleGetPosition();
              }}
            >
              {isAddressLoading ? "loading postion..." : "get position"}
            </Button>
          </span>
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={enteredValue.priority}
            onChange={handleInputChange}
            className="w-6 h-6 accent-yellow-400 ocus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary">
            {isLoading
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
