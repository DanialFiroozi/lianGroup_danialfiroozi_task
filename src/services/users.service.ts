import { axiosInstance } from "../api/axiosInstance";
import type { GetUsersList } from "../types/response/users";
import { apiUrls } from "../utilities/apiUrls";

export const usersService = {
  getAllUsersList: async (): Promise<GetUsersList> => {
    const { data } = await axiosInstance.get<GetUsersList>(
      apiUrls.getUsersList,
    );

    return data;
  },
  getUserInfo: async ({ id }: { id: string }): Promise<GetUsersList["0"]> => {
    const { data } = await axiosInstance.get<GetUsersList["0"]>(
      apiUrls.getUserInfo + id,
    );

    return data;
  },
  deleteSelectedUser: async ({
    id,
  }: {
    id: string;
  }): Promise<GetUsersList["0"]> => {
    const { data } = await axiosInstance.delete<GetUsersList["0"]>(
      apiUrls.getUserInfo + id,
    );

    return data;
  },
};
