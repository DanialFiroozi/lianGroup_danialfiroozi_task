export type AddNewUserFormInput = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  zipcode?: string;
  address?: string;
};

export type SearchInUsersListFormInput = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
};

