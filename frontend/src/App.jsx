import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>

      <ToastContainer />

      <MainLayout >
        <AppRoutes />
      </MainLayout>

    </BrowserRouter>
  );
}

export default App;