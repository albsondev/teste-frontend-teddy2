import { UserDTO } from "../../shared/interfaces/clients";
import { axiosConfig } from "../../api/axios-config";

interface QueryParams {
  limit: number;
  page: number;
}

const getUsers = async ({ page, limit }: QueryParams) => {
  return axiosConfig.get<UserDTO[]>(`users?page=${page}&limit=${limit}`);
};

const getUser = async (userId: number) => {
  return axiosConfig.get<UserDTO>(`users/${userId}`);
};

export default {
  getUser,
  getUsers,
};
