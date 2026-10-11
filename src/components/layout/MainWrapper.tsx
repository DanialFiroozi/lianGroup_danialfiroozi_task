import UsersListPage from "../../pages/UsersListPage";
import Sidebar from "./sidebar";

export default function MainWrapper() {
  return (
    <main className="p-3">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-2">
          {" "}
          {<Sidebar />}
        </div>
        <div className="lg:col-span-8 xl:col-span-9 2xl:col-span-10">
          {<UsersListPage />}
        </div>
      </section>
    </main>
  );
}
