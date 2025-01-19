import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState(null);

  async function getBrands() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };

      let { data } = await axios.request(options);
      console.log(data);

      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {brands ? (
        <div className="grid grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div className="brand" key={brand._id}>
              <img src={brand.image} alt={brand.name} />
              <h2 className="text-center">{brand.name}</h2>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
