import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 shadow py-3 fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center gap-12">
          <Link to="/">
            <img src={freshCartLogo} alt="FreshCart Logo" />
          </Link>

          {token && (
            <>
              <ul className="flex gap-5 items-center">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </li>
              </ul>

              <Link to="/cart" className="cart relative cursor-pointer ml-auto">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <div className="cart-counter flex justify-center items-center absolute right-0 top-0 h-5 translate-x-1/2 -translate-y-1/2 w-5 rounded-full bg-primary-800 text-white">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                  ) : (
                    <span className="text-sm font-semibold">
                      {cartInfo.numOfCartItems}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}

          <ul className={`flex gap-5 items-center ${!token && "ms-auto"}`}>
            <li>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>

            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>

            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>

            <li>
              <a href="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>

            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>

            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-5 items-center">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li onClick={logOut}>
                <NavLink to="">
                  <i className="fa-solid fa-right-from-bracket text-lg"></i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
