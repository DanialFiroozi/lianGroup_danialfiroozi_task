import { Button } from "../components/common/Button";
import Modal from "../components/common/Modal";
import Table from "../components/common/Table";
import TablesSkeletonLoading from "../components/common/TableSkeletonLoading";
import { useUsersList } from "../hooks/useGetUsersList";

export default function UsersListPage() {
  const {
    columns,
    showModal,
    setShowModal,
    setDeleteUser,
    isDeleteConfirm,
    setIsDeleteConfirm,
    deleteUser,
    usersList: { data, isFetching },
    userInfo: { data: userInfoDetails, isFetching: userInfoFetching },
    removeUser: { isFetching: deletedUserFetching },
  } = useUsersList();

  return (
    <section className="bg-white p-5 rounded-lg">
      <h1 className="text-black font-black text-xl mb-10"> لیست کاربران </h1>

      {isFetching ? (
        <TablesSkeletonLoading />
      ) : (
        <Table data={data || []} columns={columns} />
      )}

      <Modal
        title={
          isDeleteConfirm
            ? " از حذف کاربر مطمئن هستید؟"
            : deleteUser
              ? "وضعیت عملیات"
              : "جزئیات کاربر"
        }
        setShowModal={setShowModal}
        showModal={showModal}
        isLoading={userInfoFetching}
        footer={
          <div className="flex justify-end gap-2">
            {isDeleteConfirm && (
              <Button
                variant="fill-danger"
                size="sm"
                className="md:min-w-[132px]"
                onClick={() => {
                  setIsDeleteConfirm(false);
                  setShowModal("");
                }}
              >
                انصراف
              </Button>
            )}
            <Button
              variant="outline-danger"
              size="sm"
              className="md:min-w-[132px]"
              onClick={() => {
                if (!isDeleteConfirm) {
                  setIsDeleteConfirm(true);
                  return;
                }

                setDeleteUser(showModal);
              }}
              isLoading={deletedUserFetching}
            >
              حذف کاربر
            </Button>
          </div>
        }
      >
        {isDeleteConfirm && (
          <p className="text-sm">
            با حذف این کاربر، اطلاعات و دسترسی‌های مرتبط با حساب او حذف خواهد
            شد. این عملیات قابل بازگشت نمی باشد!
          </p>
        )}
        {!isDeleteConfirm && (
          <div className="grid grid-cols-4 gap-4">
            <div>
              <small className="text-black/70 font-light">نام:</small>
              <p className="text-sm">{userInfoDetails?.name}</p>
            </div>
            <div>
              <small className="text-black/70 font-light">نام کاربری:</small>
              <p className="text-sm">{userInfoDetails?.username}</p>
            </div>
            <div>
              <small className="text-black/70 font-light">ایمیل:</small>
              <p className="text-sm">{userInfoDetails?.email}</p>
            </div>
            <div>
              <small className="text-black/70 font-light">موبایل:</small>
              <p className="text-sm">{userInfoDetails?.phone}</p>
            </div>

            <div className="">
              <small className="text-black/70 font-light">وب سایت:</small>
              <p className="text-sm">{userInfoDetails?.website}</p>
            </div>
            <div className="">
              <small className="text-black/70 font-light">کد پستی:</small>
              <p className="text-sm">{userInfoDetails?.address?.zipcode}</p>
            </div>
            <div className="col-span-2">
              <small className="text-black/70 font-light">آدرس:</small>
              <p className="text-sm">
                {(((userInfoDetails?.address?.city as string) +
                  userInfoDetails?.address?.street) as string) +
                  userInfoDetails?.address?.suite}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
