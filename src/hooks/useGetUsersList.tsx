import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { ColumnDef } from "@tanstack/react-table";
import type { GetUsersList } from "../types/response/users";
import type { features } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useUsersList() {
  const [showModal, setShowModal] = useState("");
  const [deleteUser, setDeleteUser] = useState("");
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const usersList = useQuery({
    queryKey: ["GET_USERS_LIST"],
    queryFn: usersService.getAllUsersList,
  });

  const userInfo = useQuery({
    queryKey: ["GET_USERS_INFO", showModal],
    queryFn: () => usersService.getUserInfo({ id: showModal }),
    enabled: !!showModal,
  });

  const removeUser = useQuery({
    queryKey: ["DELETE_SELECTED_USER", deleteUser],
    queryFn: () => usersService.deleteSelectedUser({ id: deleteUser }),
    enabled: !!deleteUser,
  });

  useEffect(() => {
    if (deleteUser) {
      setDeleteUser("");
      setIsDeleteConfirm(false);
      setShowModal("");
      toast.success("کاربر با موفقیت حذف شد!");
    }
  }, [removeUser?.isSuccess]);

  const columns: ColumnDef<typeof features, GetUsersList["0"]>[] = [
    {
      header: "ردیف",
      accessorKey: "id",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "نام و نام خانوادگی",
      accessorKey: "name",
    },
    {
      header: "نام کاربری",
      accessorKey: "username",
    },
    {
      header: "موبایل",
      accessorKey: "phone",
    },
    {
      header: "ایمیل",
      accessorKey: "email",
    },
    {
      header: "جزئیات",
      accessorKey: "address",
      cell: ({ row }) => (
        <Button
          className="md:min-w-[132px] mx-auto"
          variant="outline"
          size="sm"
          onClick={() => setShowModal(String(row.original.id))}
        >
          نمایش
        </Button>
      ),
    },
  ];

  return {
    usersList,
    columns,
    showModal,
    setShowModal,
    userInfo,
    deleteUser,
    setDeleteUser,
    removeUser,
    isDeleteConfirm,
    setIsDeleteConfirm,
  };
}
