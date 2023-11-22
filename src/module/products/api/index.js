import api from "../../../shared/api";

export const getProductList = () => api.get("/products");
