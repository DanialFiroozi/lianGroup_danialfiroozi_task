import { PlusIcon, SearchIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "../components/common/Button";
import InputField from "../components/common/InputField";
import Modal from "../components/common/Modal";
import Table from "../components/common/Table";
import TablesSkeletonLoading from "../components/common/TableSkeletonLoading";
import { useUsersList } from "../hooks/useGetUsersList";
import { inputFieldsError } from "../utilities/commonErrorMessages";
import { replaceCharWithDigit, replaceFaChars } from "../utilities/functions";

export default function UsersListPage() {
  const {
    columns,
    showUserInfoModal,
    setShowUserInfoModal,
    setDeleteUser,
    isDeleteConfirm,
    setIsDeleteConfirm,
    addNewUser,
    setAddNewUser,
    errors,
    register,
    handleSubmit,
    addNewUserFn,
    isLocalUser,
    deleteSelectedLocalUser,
    userSearchingRegister,
    userSearchingHandleSubmit,
    searchUserFn,
    selectedLocalUser,
    filteredUsers,
    clearSearch,
    userSearchingWatch,
    usersList: { isFetching },
    userInfo: { data: userInfoDetails, isFetching: userInfoFetching },
    removeUser: { isFetching: deletedUserFetching },
  } = useUsersList();

  const hasSearchValue = Object.values(userSearchingWatch()).some(
    (value) => String(value ?? "").trim() !== "",
  );

  return (
    <section>
      <section className="bg-(--bg-card) p-3 md:p-5 rounded-lg">
        <div className="flex justify-between gap-3 items-center">
          <h1 className="text-(--text-primary) font-black text-lg md:text-xl">
            {" "}
            لیست کاربران{" "}
          </h1>
          <Button
            variant="primary"
            onClick={() => setAddNewUser("add-new-user")}
          >
            <PlusIcon className="text-white" />
            افزودن کاربر جدید
          </Button>
        </div>

        <Modal
          title={
            isDeleteConfirm ? " از حذف کاربر مطمئن هستید؟" : "جزئیات کاربر"
          }
          setShowModal={setShowUserInfoModal}
          showModal={showUserInfoModal}
          isLoading={userInfoFetching}
          footer={
            <div className="flex justify-end gap-2">
              {isDeleteConfirm && (
                <Button
                  variant="fill-danger"
                  size="sm"
                  className="md:min-w-33"
                  onClick={() => {
                    setIsDeleteConfirm(false);
                    setShowUserInfoModal("");
                  }}
                >
                  انصراف
                </Button>
              )}
              <Button
                variant="outline-danger"
                size="sm"
                className="md:min-w-33"
                onClick={() => {
                  if (!isDeleteConfirm) {
                    setIsDeleteConfirm(true);
                    return;
                  }

                  isLocalUser
                    ? deleteSelectedLocalUser()
                    : setDeleteUser(showUserInfoModal);
                }}
                isLoading={deletedUserFetching}
                iconColor="#dc3545"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <small className="text-(--text-secondary) font-light">
                  نام:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.name ||
                    selectedLocalUser?.name ||
                    "یافت نشد!"}
                </p>
              </div>
              <div>
                <small className="text-(--text-secondary) font-light">
                  نام کاربری:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.username ||
                    selectedLocalUser?.username ||
                    "یافت نشد!"}
                </p>
              </div>
              <div>
                <small className="text-(--text-secondary) font-light">
                  ایمیل:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.email ||
                    selectedLocalUser?.email ||
                    "یافت نشد!"}
                </p>
              </div>
              <div>
                <small className="text-(--text-secondary) font-light">
                  موبایل:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.phone ||
                    selectedLocalUser?.phone ||
                    "یافت نشد!"}
                </p>
              </div>

              <div className="">
                <small className="text-(--text-secondary) font-light">
                  وب سایت:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.website ||
                    selectedLocalUser?.website ||
                    "یافت نشد!"}
                </p>
              </div>
              <div className="">
                <small className="text-(--text-secondary) font-light">
                  کد پستی:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.address?.zipcode ||
                    selectedLocalUser?.zipcode ||
                    "یافت نشد!"}
                </p>
              </div>
              <div className="col-span-2">
                <small className="text-(--text-secondary) font-light">
                  آدرس:
                </small>
                <p className="text-sm  wrap-break-word">
                  {userInfoDetails?.address?.city +
                    userInfoDetails?.address?.street +
                    userInfoDetails?.address?.suite ||
                    selectedLocalUser?.address ||
                    "یافت نشد!"}
                </p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title="افزودن کاربر جدید"
          setShowModal={setAddNewUser}
          showModal={addNewUser}
          footer={
            <div className="flex justify-end w-full md:w-fit">
              <Button
                variant="primary"
                size="sm"
                className="w-full md:min-w-33"
                onClick={handleSubmit(addNewUserFn)}
              >
                افزودن کاربر جدید
              </Button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
            <InputField
              label="نام:"
              register={register("name", {
                required: inputFieldsError.emptyField,
              })}
              error={errors.name?.message}
              required
              showError
              id="name"
            />
            <InputField
              label="نام کاربری:"
              register={register("username", {
                required: inputFieldsError.emptyField,
              })}
              onInput={(e) => replaceFaChars(e.currentTarget)}
              dir="ltr"
              error={errors.username?.message}
              required
              showError
              id="username"
            />
            <InputField
              label="موبایل:"
              register={register("phone", {
                required: inputFieldsError.emptyField,
                pattern: {
                  value: /(\+98|0)?9\d{9}/,
                  message: inputFieldsError.phoneNumberPattern,
                },
              })}
              error={errors.phone?.message}
              onInput={(e) => replaceCharWithDigit(e.currentTarget)}
              maxLength={11}
              dir="ltr"
              inputMode="numeric"
              required
              showError
              id="phone"
            />
            <InputField
              label="ایمیل:"
              register={register("email", {
                required: inputFieldsError.emptyField,
              })}
              error={errors.email?.message}
              onInput={(e) => replaceFaChars(e.currentTarget)}
              dir="ltr"
              required
              showError
              id="email"
            />
            <InputField
              label="وب سایت:"
              register={register("website")}
              error={errors.website?.message}
              onInput={(e) => replaceFaChars(e.currentTarget)}
              dir="ltr"
              showError
              id="website"
            />
            <InputField
              label="کدپستی:"
              register={register("zipcode")}
              error={errors.zipcode?.message}
              onInput={(e) => replaceCharWithDigit(e.currentTarget)}
              dir="ltr"
              showError
              id="zipcode"
            />
            <InputField
              label="آدرس:"
              register={register("address")}
              error={errors.address?.message}
              wrapperClassName="col-span-full lg:col-span-3"
              showError
              id="address"
            />
          </div>
        </Modal>
      </section>

      <section className="bg-(--bg-card) p-3 md:p-5 rounded-lg mt-2">
        <h1 className="text-(--text-primary) font-bold text-lg mb-4 md:mb-8">
          {" "}
          جستجو{" "}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <InputField
            label="نام:"
            register={userSearchingRegister("name")}
            id="name"
          />
          <InputField
            label="نام کاربری:"
            register={userSearchingRegister("username")}
            onInput={(e) => replaceFaChars(e.currentTarget)}
            dir="ltr"
            autoComplete="off"
            id="username"
          />
          <InputField
            label="موبایل:"
            register={userSearchingRegister("phone")}
            onInput={(e) => replaceCharWithDigit(e.currentTarget)}
            maxLength={11}
            dir="ltr"
            inputMode="numeric"
            autoComplete="off"
            id="phone"
          />
          <InputField
            label="ایمیل:"
            register={userSearchingRegister("email")}
            onInput={(e) => replaceFaChars(e.currentTarget)}
            dir="ltr"
            autoComplete="off"
            id="email"
          />
          <div className="flex justify-end items-end md:col-span-2 lg:col-span-2 xl:col-span-4 2xl:col-span-1 gap-2">
            {hasSearchValue && (
              <Button
                className="text-(--text-primary)!"
                variant="ghost"
                size="sm"
                onClick={() => clearSearch()}
              >
                <RefreshCwIcon className="text-inherit size-4 ml-1" />
                حذف فیلترها
              </Button>
            )}
            <Button
              variant="outline"
              onClick={userSearchingHandleSubmit(searchUserFn)}
            >
              <SearchIcon className="text-inherit size-5 ml-1" />
              جستجو
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-(--bg-card) p-3 md:p-5 rounded-lg mt-2">
        {isFetching ? (
          <TablesSkeletonLoading />
        ) : (
          <Table data={filteredUsers} columns={columns} />
        )}
      </section>
    </section>
  );
}
