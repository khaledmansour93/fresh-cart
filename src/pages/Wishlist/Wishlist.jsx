import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let { token } = useContext(UserContext);

  const [wishlistInfo, setWishlistInfo] = useState(null);

  async function getWishlist() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      console.log(data);

      setWishlistInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  function removeProduct(productId) {
    setWishlistInfo((prevWishlist) => {
      const updatedData = prevWishlist.data.filter(
        (product) => product.id !== productId
      );
      return {
        ...prevWishlist,
        data: updatedData,
        count: updatedData.length,
      };
    });
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      {wishlistInfo === null ? (
        <Loading />
      ) : (
        <section>
          <h2 className="text-xl text-slate-600 font-semibold">
            My Wishlist (
            <span className="text-primary-900">{wishlistInfo.count}</span>)
          </h2>
          {wishlistInfo.count === 0 ? (
            <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center">
              <h2>Your wishlist is empty</h2>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              {wishlistInfo.data.map((product) => (
                <WishlistItem
                  key={product._id}
                  productInfo={product}
                  removeProduct={removeProduct}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
