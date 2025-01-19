import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import { useState } from "react";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Wishlist from "./pages/Wishlist/Wishlist";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <ProtectedRoute>
  //         <Layout />
  //       </ProtectedRoute>
  //     ),
  //     children: [
  //       { index: true, element: <Home /> },
  //       { path: "cart", element: <Cart /> },
  //       { path: "product/:id", element: <ProductDetails /> },
  //       { path: "checkout", element: <Checkout /> },
  //       { path: "allorders", element: <Orders /> },
  //       { path: "categories", element: <Categories /> },
  //       { path: "brands", element: <Brands /> },
  //       { path: "wishlist", element: <Wishlist /> },
  //     ],
  //   },

  //   {
  //     path: "/",
  //     element: (
  //       <GuestRoute>
  //         <Layout />
  //       </GuestRoute>
  //     ),
  //     children: [
  //       { path: "signup", element: <Signup /> },
  //       { path: "login", element: <Login /> },
  //       { path: "forgetpassword", element: <ForgetPassword /> },
  //       { path: "verifycode", element: <VerifyCode /> },
  //       { path: "resetpassword", element: <ResetPassword /> },
  //     ],
  //   },
  // ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            {/* <RouterProvider router={router} /> */}
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="product/:id" element={<ProductDetails />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="allorders" element={<Orders />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="brands" element={<Brands />} />
                  <Route path="wishlist" element={<Wishlist />} />
                </Route>

                <Route
                  path="/"
                  element={
                    <GuestRoute>
                      <Layout />
                    </GuestRoute>
                  }
                >
                  <Route path="signup" element={<Signup />} />
                  <Route path="login" element={<Login />} />
                  <Route path="forgetpassword" element={<ForgetPassword />} />
                  <Route path="verifycode" element={<VerifyCode />} />
                  <Route path="resetpassword" element={<ResetPassword />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </UserProvider>

        <Toaster position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
