import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../api/functions/getProductDetails";

export const useGetProductDetails = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });

  return { data, isLoading, isError };
};
