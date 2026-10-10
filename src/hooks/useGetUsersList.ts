import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export function useGetUsersList() {
  return useQuery({
    queryKey: ["GET_USERS_LIST"],
    queryFn: usersService.getAllUsersList,
  });
}
