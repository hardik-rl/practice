import api from "../../../shared/api";

export const getProductList = () => api.get("https://fakestoreapi.com/products");
