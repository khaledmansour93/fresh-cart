import useCategories from "../../hooks/useCategories";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
  let { data, isLoading } = useCategories();

  if (isLoading) return <Loading />;

  console.log(data);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="grid grid-cols-5 gap-x-4">
        {data.data.data.map((category) => (
          <div className="category-item h-96" key={category._id}>
            <img
              src={category.image}
              alt={category.name}
              className="w-72 h-72 object-cover"
            />
            <h2 className="text-center mt-2">{category.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
