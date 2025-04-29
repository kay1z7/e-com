import { instance } from "@/src/configs/Config";

export const getProducts = (limit) => instance.get(`/market/?limit=${limit}`);

export const getCategories = () => instance.get(`/marketplace/categories/`);

export const getProductsByCategories = (id, limit) =>
  instance.get(`/search/goods/?search=&category=${id}&limit=${limit}`);

export const getDetails = (id) => instance.get(`/marketplace/barcodes/${id}/`);

export const search = (str) => instance.get(`/search/goods/?search=${str}&limit=5`);

export const register = (phoneNumber) =>
  instance.post("/auth/users/", {
    username: `${phoneNumber}`,
    name: `${phoneNumber}`,
    last_name: `${phoneNumber}`,
  });
export const auth = (phoneNumber) => instance.post("/auth/authorization/", { phone: phoneNumber });

export const confirmCode = (code) => instance.post("/auth/confirm/", { code });

export const getBasket = () => instance.get("market/profile/orders");

export const postBasket = (id) => instance.post(`/market/shops/${id}/orders`, {});
