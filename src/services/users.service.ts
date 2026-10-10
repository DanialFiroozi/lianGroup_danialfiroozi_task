import { axiosInstance } from "../api/axiosInstance";
import type { GetUsersList } from "../types/queries/users";
import { apiUrls } from "../utilities/apiUrls";

export const usersService = {
  getAllUsersList: async (): Promise<GetUsersList> => {
    const { data } = await axiosInstance.get<GetUsersList>(
      apiUrls.getUsersList,
    );

    return data;
  },

  //   getById: async (id: number): Promise<User> => {
  //     const { data } = await axiosInstance.get<User>(`/users/${id}`);

  //     return data;
  //   },
};
