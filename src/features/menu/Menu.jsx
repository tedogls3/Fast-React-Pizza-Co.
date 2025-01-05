import { useGetMenuQuery } from "../../services/apiSlice";

import Error from "../../ui/Error";
import MenuItem from "./MenuItem";
import Loader from "../../ui/Loader";

function Menu() {
  const { data, isError, isLoading } = useGetMenuQuery();

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  const pizzas = data?.data;

  return (
    <ul className="px-2 divide-y divide-stone-200">
      {pizzas?.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;
