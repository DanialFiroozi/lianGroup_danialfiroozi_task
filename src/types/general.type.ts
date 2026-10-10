export type ModalPropsType = {
  title: string;
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
  wrapperWidth?: string;
  isLoading?: boolean;
  footer?: React.ReactNode;
};
