"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/functions/getAllProducts";

export const useGetProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { data, isLoading, isError };
};
