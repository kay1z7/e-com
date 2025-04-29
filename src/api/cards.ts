import { toast } from "react-toastify";

import { instance } from "../configs/Config";

export const getCards = () =>
  instance
    .get(`/market`)
    .then((data) => data.data)
    .catch((e) => toast(e, { type: "error" }));

export const getDetails = (id) =>
  instance
    .get(`/marketplace/barcodes/${id}/`)
    .then((data) => data.data)
    .catch((e) => toast(e, { type: "error" }));
