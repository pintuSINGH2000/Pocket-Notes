import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomepagePage from "./pages/HomepagePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotePage from "./pages/NotePage";
import GroupPage from "./pages/GroupPage";
import ProtectedRoute from "./component/ProtectedRoute";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={HomepagePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/note/:noteId" element={<NotePage />} />
        <Route path="/group/:groupId" element={<GroupPage />} />
      </Routes>
    </>
  );
}

export default App;
