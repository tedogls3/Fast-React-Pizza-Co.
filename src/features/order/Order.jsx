import { useParams } from "react-router-dom";
import {
  useGetMenuQuery,
  useGetOrderItemByIdQuery,
} from "../../services/apiSlice";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import OrderItem from "./OrderItem";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

function Order() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderItemByIdQuery(orderId);
  const { data: ingData, isLoading: ingLoading } = useGetMenuQuery();

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order.data || {};

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-red-500 rounded-full text-red-50">
              Priority
            </span>
          )}
          <span className="px-3 py-1 text-sm font-semibold tracking-wide uppercase bg-green-500 rounded-full text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 bg-stone-200">
        <p className="text-xs font-medium text-stone-500">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="border-t border-b divide-y divide-stone-200">
        {cart?.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={ingLoading}
            ingredients={
              ingData?.data.find((el) => el.id === item.pizzaId)?.ingredients
            }
          />
        ))}
      </ul>

      <div className="px-6 py-5 space-y-2 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default Order;
