import { Link, useLocation } from "react-router";
import logo from "../../assets/images/svg/logo-fa.png";
import { localUrls } from "../../utilities/localUrls";
import { ArrowLeftIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../common/ThemeToggler";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const Icon = showMenu ? XIcon : MenuIcon;

  return (
    <aside>
      <div className="bg-(--bg-sidebar) p-4 rounded-lg h-full relative">
        <Icon
          className="cursor-pointer lg:hidden text-(--text-primary) relative z-50"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-(--bg-page) backdrop-blur-sm ${showMenu ? "opacity-70 visible" : "opacity-0 invisible"}`}
        />
        <div
          className={`absolute left-0 right-0 top-full  rounded-lg bg-(--bg-sidebar) z-50 p-4 duration-300 shadow-2xl lg:shadow-none lg:static lg:opacity-100 lg:visible ${showMenu ? "opacity-100 visible" : "invisible opacity-0"}`}
        >
          <div className="text-center pb-5 border-b border-(--border-color)">
            <img src={logo} alt="لوگو" className="mx-auto size-25 mb-3" />
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium"> کاربر گرامی خوش آمدید! </h5>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-5">
            <nav className="flex flex-col gap-1">
              <Link
                className="flex justify-between items-center text-(--text-primary) text-[15px] duration-300 px-5 py-3 rounded-lg hover:bg-primary/10"
                to={"/"}
              >
                داشبورد
              </Link>
              <Link
                className={`${pathname === localUrls.usersList && "bg-primary/10 font-bold text-primary"} flex justify-between items-center text-[15px] duration-300 pl-2 pr-5 py-3 rounded-lg hover:bg-primary/10`}
                to={localUrls.usersList}
              >
                کاربران
                <ArrowLeftIcon className="size-4" />
              </Link>
              <Link
                className="flex justify-between items-center text-(--text-primary) text-[15px] duration-300 px-5 py-3 rounded-lg hover:bg-primary/10"
                to={"/"}
              >
                سوابق خرید
              </Link>
              <Link
                className="flex justify-between items-center text-(--text-primary) text-[15px] duration-300 px-5 py-3 rounded-lg hover:bg-primary/10"
                to={"/"}
              >
                تراکنشات
              </Link>
              <Link
                className="flex justify-between items-center text-(--text-primary) text-[15px] duration-300 px-5 py-3 rounded-lg hover:bg-primary/10"
                to={"/"}
              >
                اطلاعات کاربری
              </Link>
              <Link
                className="text-red-700 bg-red-50 text-[15px] duration-300 px-5 py-3 rounded-lg mt-32"
                to={"/"}
              >
                خروج از حساب کاربری
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
