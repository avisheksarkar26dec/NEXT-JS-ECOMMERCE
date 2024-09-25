import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getProductDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(endpoints.product(id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
