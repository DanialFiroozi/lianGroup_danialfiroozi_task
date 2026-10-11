import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { ColumnDef } from "@tanstack/react-table";
import type { features } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { GetUsersListApiRes } from "../types/response/UsersApiRes.type";
import type {
  AddNewUserFormInput,
  SearchInUsersListFormInput,
} from "../types/forms/AddNewUser.type";
import { alphabeticalSorting } from "../utilities/functions";

export function useUsersList() {
  const {
    register,
    watch,
    formState: { isDirty, errors, isValid },
    handleSubmit,
    reset,
  } = useForm<AddNewUserFormInput>();

  const {
    register: userSearchingRegister,
    handleSubmit: userSearchingHandleSubmit,
    reset: userSearchingReset,
    watch: userSearchingWatch,
  } = useForm<SearchInUsersListFormInput>();

  const USERS_STORAGE_KEY = "localUsers";
  const [localUsers, setLocalUsers] = useState<AddNewUserFormInput[]>([]);
  const [showUserInfoModal, setShowUserInfoModal] = useState("");
  const [isLocalUser, setIsLocalUser] = useState<boolean>(false);
  const [deleteUser, setDeleteUser] = useState("");
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [addNewUser, setAddNewUser] = useState("");

  const usersList = useQuery({
    queryKey: ["GET_USERS_LIST"],
    queryFn: usersService.getAllUsersList,
  });

  const userInfo = useQuery({
    queryKey: ["GET_USERS_INFO", showUserInfoModal],
    queryFn: () => usersService.getUserInfo({ id: showUserInfoModal }),
    enabled: !!showUserInfoModal && !isLocalUser,
  });

const removeUser = useMutation({
  mutationFn: (id: string) => usersService.deleteSelectedUser({ id }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["GET_USERS_LIST"] });
    toast.success("کاربر با موفقیت حذف شد!");
  },
  onError: () => toast.error("خطا در حذف کاربر"),
});

  useEffect(() => {
    if (removeUser?.data) {
      setDeleteUser("");
      setIsDeleteConfirm(false);
      setShowUserInfoModal("");
      toast.success("کاربر با موفقیت حذف شد!");
    }
  }, [removeUser?.isSuccess]);

  useEffect(() => {
    const storedData = localStorage.getItem(USERS_STORAGE_KEY);

    if (!storedData) return;

    setLocalUsers(JSON.parse(storedData));
  }, []);

  const addNewUserFn: SubmitHandler<AddNewUserFormInput> = (data) => {
    const newUser = {
      ...data,
      id: crypto.randomUUID(),
      source: "local",
    };

    const updatedUsersList = [newUser, ...localUsers];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsersList));

    setLocalUsers(updatedUsersList);

    setAddNewUser("");
    reset({
      address: "",
      email: "",
      name: "",
      phone: "",
      username: "",
      website: "",
      zipcode: "",
    });
    toast.success("کاربر جدید با موفقیت اضافه شد!");
  };

  const deleteSelectedLocalUser = () => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
    const updatedUsers = users.filter(
      (user: GetUsersListApiRes["0"]) =>
        user.id.toString() !== showUserInfoModal,
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setLocalUsers(updatedUsers);
    setDeleteUser("");
    setIsDeleteConfirm(false);
    setShowUserInfoModal("");
    toast.success("کاربر با موفقیت حذف شد!");
  };

  const allLocalUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

  const selectedLocalUser = allLocalUsers.find(
    (user: GetUsersListApiRes["0"]) => user.id.toString() === showUserInfoModal,
  );

  const allMergedUsers = [
    ...localUsers,
    ...(usersList?.data ?? []).map((user: GetUsersListApiRes["0"]) => ({
      ...user,
      source: "api" as const,
    })),
  ];

  const [filteredUsers, setFilteredUsers] = useState(allMergedUsers);

  useEffect(() => {
    setFilteredUsers(allMergedUsers);
  }, [usersList?.data, localUsers]);

  const searchUserFn: SubmitHandler<SearchInUsersListFormInput> = (data) => {
    const searchEntries = Object.entries(data).filter(
      ([, value]) => String(value ?? "").trim() !== "",
    );

    if (searchEntries.length === 0) {
      setFilteredUsers(allMergedUsers);
      return;
    }

    const result = allMergedUsers.filter((user) =>
      searchEntries.some(([key, value]) => {
        const userValue = user[key as keyof typeof user];

        return String(userValue ?? "")
          .toLowerCase()
          .includes(String(value).trim().toLowerCase());
      }),
    );

    setFilteredUsers(result);
  };

  const clearSearch = () => {
    userSearchingReset({
      name: "",
      username: "",
      phone: "",
      email: "",
    });

    setFilteredUsers(allMergedUsers);
  };

  const columns: ColumnDef<typeof features, GetUsersListApiRes["0"]>[] = [
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
      sortFn: alphabeticalSorting,
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
          className="md:min-w-33 mx-auto"
          variant="outline"
          size="sm"
          onClick={() => {
            setShowUserInfoModal(String(row.original?.id));
            setIsLocalUser(row.original?.source === "local");
          }}
        >
          نمایش
        </Button>
      ),
    },
  ];

  return {
    localUsers,
    usersList,
    columns,
    showUserInfoModal,
    setShowUserInfoModal,
    userInfo,
    deleteUser,
    setDeleteUser,
    removeUser,
    isDeleteConfirm,
    setIsDeleteConfirm,
    addNewUser,
    setAddNewUser,
    isDirty,
    errors,
    isValid,
    register,
    watch,
    handleSubmit,
    addNewUserFn,
    isLocalUser,
    deleteSelectedLocalUser,
    userSearchingRegister,
    userSearchingHandleSubmit,
    searchUserFn,
    allLocalUsers,
    selectedLocalUser,
    allMergedUsers,
    filteredUsers,
    clearSearch,
    userSearchingWatch,
  };
}
