import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Card({ productInfo }) {
  const {
    imageCover,
    title,
    price,
    category,
    description,
    ratingsAverage,
    id,
  } = productInfo;
  let { addProductToCart } = useContext(CartContext);

  let { token } = useContext(UserContext);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function checkWishlist() {
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/wishlist",
          method: "GET",
          headers: {
            token,
          },
        };

        const { data } = await axios.request(options);
        const isProductInWishlist = data.data.some(
          (product) => product.id === id
        );
        setIsInWishlist(isProductInWishlist);
      } catch (error) {
        console.log(error);
      }
    }

    checkWishlist();
  }, [id, token]);

  async function addProductToWishlist({ productId }) {
    let toastId = toast.loading("Adding product to wishlist...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <div className="card group/card rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img src={imageCover} alt="woman-shawl" />
          <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 flex gap-3 justify-center items-center absolute left-0 top-0 w-full h-full bg-slate-400 bg-opacity-40 opacity-0">
            <div
              onClick={() => {
                addProductToWishlist({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-800 text-white flex justify-center items-center"
            >
              <i
                className={`fa-solid fa-heart ${
                  isInWishlist ? "text-black" : ""
                }`}
              ></i>
            </div>

            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-800 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-800 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>

        <div className="card-body p-4 space-y-3">
          <header>
            <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h3>
            <h4 className="text-primary-800 font-semibold">{category.name}</h4>
          </header>

          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span>{price} L.E</span>
            <div>
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
