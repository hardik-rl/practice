import api from "../../../shared/api";

export const getProductList = () => api.get("/products");

export const addProductApi = (data) => api.post("/products", data);
