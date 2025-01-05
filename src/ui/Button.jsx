/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Button({ children, to, type, onClick }) {
  const base =
    "inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full hover:bg-yellow-300 text-stone-800 focus:ring focus:ring-yellow-300 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4 ",
    secondary:
      "text-sm px-4 py-2.5 md:px-6 md:py-3.5 border-2 border-stone-300 inline-block  font-semibold tracking-wide uppercase transition-colors duration-300  rounded-full hover:bg-stone-300 text-stone-400 focus:ring focus:ring-stone-200 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed hover:text-stone-800 focus:text-stone-800 ",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
