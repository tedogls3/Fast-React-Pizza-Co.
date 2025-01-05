import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 text-sm transition-all duration-200 bg-yellow-100 rounded-full focus:ring-opacity-20 focus:outline-none focus:ring-yellow-500 placeholder:text-stone-400 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
