import { useContext } from "react";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishlistItem({ productInfo, removeProduct }) {
  const { imageCover, title, category, price, id } = productInfo;

  let { token } = useContext(UserContext);

  async function removeProductFromWishlist() {
    let toastId = toast.loading("Deleting product from wishlist...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        removeProduct(id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <div className="flex gap-2">
      <div className="wishlist-item grow flex justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
        <img
          src={imageCover}
          alt={title}
          className="w-24 h-24 object-cover rounded-full border-4 border-white"
        />
        <h3 className="text-lg text-gray-700 font-semibold">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        <span>{price} L.E</span>
      </div>

      <button
        onClick={removeProductFromWishlist}
        className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
