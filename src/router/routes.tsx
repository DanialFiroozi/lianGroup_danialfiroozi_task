import { Routes, Route } from "react-router";
import UsersListPage from "../pages/UsersListPage";
import { localUrls } from "../utilities/localUrls";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route index path={localUrls.usersList} element={<UsersListPage />} />
    </Routes>
  );
}
