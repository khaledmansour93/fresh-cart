import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import useCategories from "../../hooks/useCategories";

export default function CategorySlider() {
  // async function getCategories() {
  //   const options = {
  //     url: "https://ecommerce.routemisr.com/api/v1/categories",
  //     method: "GET",
  //   };

  //   return axios.request(options);
  // }

  // let { data, isLoading, isError, isFetched, isFetching } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getCategories,
  //   refetchOnMount: false,
  //   staleTime: 60 * 60 * 1000,
  // });

  // if (isLoading) return <Loading />;

  let { data, isLoading } = useCategories();

  if (isLoading) return <Loading />;

  console.log(data);

  return (
    <>
      <section className="my-8">
        <h2 className="mb-5 text-lg font-semibold">Shop Popular Categories</h2>

        <Swiper slidesPerView={6} loop={true}>
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="h-64">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h3 className="mt-2">{category.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
