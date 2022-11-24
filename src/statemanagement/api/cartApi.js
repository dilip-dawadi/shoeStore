import API from "./index";

export const GetAllCartAPI = () => API.get("/user/cart");
export const AddCartAPI = (id) => API.post(`/user/cart/${id}`);
export const DeleteCartAPI = (id) => API.delete(`/user/cart/${id}`);
export const CartQuantityAPI = (id, status) => API.post(`/user/cart/${id}/quantity`, { status });
export const checkoutAPI = (total) => API.post("/user/checkout", { total });