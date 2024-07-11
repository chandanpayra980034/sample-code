import axiosClient from "../axiosClient";

export const cartApi = {
    addToCart: async (params) => {
        try {
            const response = await axiosClient.post(`/api/products/add-to-cart/`, params);
            return response.data;
        } catch (err) {
            return null;
        }
    }
}