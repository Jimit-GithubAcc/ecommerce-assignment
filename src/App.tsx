import { ToastContainer } from "react-toastify";
import RouterCompo from "./router/RouterCompo";
import "./assets/styles/variables.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterCompo />
      <ToastContainer closeOnClick />
    </>
  );
}

export default App;
