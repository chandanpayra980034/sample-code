import axiosClient from "../axiosClient";
export const productApi = {
    getAll: async () => {
        try {
            const response = await axiosClient.get(`/api/products`);
            return response.data;
        } catch (err) {
            return []
        }
    },
    getCarouselList: async () => {
        try {
            const response = await axiosClient.get(`/api/featured-products`);
            return response.data;
        } catch (err) {
            return []
        }
    },
    getDetails: async (params) => {
        try {
            const response = await axiosClient.get(`/api/products/${params?.id}`)
            return response.data;
        } catch (err) {
            return {}
        }
    }
}