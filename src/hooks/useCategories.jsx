import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { data, isLoading };
}
