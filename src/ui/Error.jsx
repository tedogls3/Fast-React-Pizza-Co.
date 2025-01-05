import { useGetMenuQuery } from "../services/apiSlice";
import LinkButton from "./LinkButton";

function NotFound() {
  const { isError } = useGetMenuQuery();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{isError.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
