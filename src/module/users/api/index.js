import api from "../../../shared/api";

export const getUsersList = () => api.get("/users");
