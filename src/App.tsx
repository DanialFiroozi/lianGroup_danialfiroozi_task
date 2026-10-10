import Sidebar from "./components/layout/sidebar";
import UsersListPage from "./pages/UsersListPage";

function App() {
  return (
    <main className="p-3">
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-2"> {<Sidebar />}</div>
        <div className="col-span-10">{<UsersListPage />}</div>
      </section>
    </main>
  );
}

export default App;
