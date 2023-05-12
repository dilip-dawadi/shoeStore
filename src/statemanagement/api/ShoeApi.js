import API from "./index";

export const GetAllShoeAPI = ({ page, limit, sort, brand, category, price }) => API.get("/shoesPage", {
    params: {
        page,
        limit,
        sort,
        brand,
        category,
        price
    }
});
export const GetTopShoeAPI = () => API.get("/shoesPage/top");
export const GetShoeByIdAPI = (id) => API.get(`/shoesPage/${id}`);
export const CreateShoeAPI = (AddProductData) => API.post("/shoesPage", AddProductData);
export const GetFilterData = () => API.get("/shoesPage/filter");