import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  // & Add
  async function addProductToCart({ productId }) {
    let toastId = toast.loading("Adding product...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);

      console.log(data);

      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // * Get
  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  // ^ Remove
  async function removeProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting Product...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product has been deleted");
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ! Clear
  async function clearCart() {
    let toastId = toast.loading("Clearing Cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Cart has been cleared");
        setCartInfo({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ? Update Count
  async function updateProductCount({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
