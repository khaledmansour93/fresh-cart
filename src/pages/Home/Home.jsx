import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";
import { useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import useOnline from "../../hooks/useOnline";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    console.log("✅");

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    return axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnMount: false,
    gcTime: 10000,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Home Page for FreshCart" />
      </Helmet>

      <HomeSlider />
      <CategorySlider />

      <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((product) => (
          <Card productInfo={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
