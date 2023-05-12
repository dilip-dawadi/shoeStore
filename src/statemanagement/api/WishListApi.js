import API from "./index";

export const GetAllWishListAPI = ({ page, limit, sort, brand, category, price }) => API.get("/user/wishlist", {
    params: {
        page,
        limit,
        sort,
        brand,
        category,
        price
    }
});
export const AddWishListAPI = (id) => API.post(`/user/wishlist/${id}`);
export const DeleteWishListAPI = (id) => API.delete(`/user/wishlist/${id}`);