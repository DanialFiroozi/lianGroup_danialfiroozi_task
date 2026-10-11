import { useEffect } from "react";
import { useNavigate } from "react-router";
import MainWrapper from "./components/layout/MainWrapper";
import { localUrls } from "./utilities/localUrls";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(localUrls.usersList, { replace: true });
  }, [navigate]);
  return <MainWrapper />;
}

export default App;
