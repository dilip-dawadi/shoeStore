import API from "./index";

export const GetAllWishListAPI = () => API.get("/user/wishlist");
export const AddWishListAPI = (id) => API.post(`/user/wishlist/${id}`);
export const DeleteWishListAPI = (id) => API.delete(`/user/wishlist/${id}`);