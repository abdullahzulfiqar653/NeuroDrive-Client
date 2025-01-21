import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useAuth } from "./AuthContext";
import CreateComponent from "./Components/CreateComponent";
import ShareFile from "./Components/ShareFile";
import Home from "./app/Pages/Home";
import Login from "./app/Pages/Login";
import Register from "./app/Pages/Register";
import TextFile from "./app/Pages/TextFile";
import ProtectedRoute from "./ProtectedRoute";
import { FileProvider } from "./FileContext";

function App() {
  const { isOpenComponent } = useAuth();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FileProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/text-file"
            element={<ProtectedRoute element={<TextFile />} />}
          />
        </Routes>
      </FileProvider>

      {isOpenComponent.share && <ShareFile />}
      {(isOpenComponent.newFolder ||
        isOpenComponent.newExcel ||
        isOpenComponent.newDocs) && <CreateComponent />}
    </>
  );
}

export default App;
