import type { ModalPropsType } from "../../types/general.type";
import CircleCloseIcon from "../../assets/images/svg/close-circle.svg";
import { BeatLoader } from "react-spinners";

export default function Modal({
  title,
  showModal,
  setShowModal,
  children,
  wrapperWidth = "max-w-[820px]",
  isLoading,
  footer,
}: ModalPropsType) {
  return (
    <div
      className={`modal flex items-center justify-center duration-200 p-4 fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[999] bg-[rgba(0,0,0,0.8)] ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={() => setShowModal("")}
    >
      <div
        className={`${wrapperWidth} rounded-xl bg-white duration-500 w-full overflow-y-auto max-h-[calc(100vh-7rem)] md:max-h-full ${
          showModal ? "translate-y-0 opacity-100" : "-translate-y-2/3 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-56">
            <BeatLoader color="#309fd9" size={20} />
          </div>
        ) : (
          <>
            <div className="modal-header p-6 bg-gray-200/30 flex justify-between items-start gap-x-4">
              <h3 className="font-bold text-lg md:text-xl text-black">
                {" "}
                {title}{" "}
              </h3>
              <span
                className="cursor-pointer relative top-1 text-black"
                onClick={() => setShowModal("")}
              >
                <img src={CircleCloseIcon} alt="close" className="h-6 w-6" />
              </span>
            </div>
            <div className="modal-body  p-4 md:p-6">{children && children}</div>
            {footer && (
              <div className="modal-footer bg-gray-200/30 p-6 mt-6 flex flex-wrap gap-3 items-center justify-end">
                {footer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
