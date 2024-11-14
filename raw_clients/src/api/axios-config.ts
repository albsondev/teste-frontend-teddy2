import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: `https://boasorte.teddybackoffice.com.br/`,
});
