import { Outlet } from "react-router-dom";

import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-scroll ">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
