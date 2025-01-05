import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./ui/Home"));
const PageNotFound = lazy(() => import("./ui/pageNotFound"));
const Menu = lazy(() => import("./features/menu/Menu"));
const Cart = lazy(() => import("./features/cart/Cart"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
const Order = lazy(() => import("./features/order/Order"));
const AppLayout = lazy(() => import("./ui/AppLayout"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order/new" element={<CreateOrder />} />
          <Route path="order/:orderId" element={<Order />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
