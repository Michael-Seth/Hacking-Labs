import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Competition from "./pages/Competition/Competition";
import Dashboard from "./pages/Dashboard/Dashboard";
import Forgot from "./Auth/Forgot";
import Home from "./pages/Home/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Reset from "./Auth/Reset";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            {/* <Route path="/dashboard/labs/:id" element={<Room />} /> */}
          </Routes>
        </Router>
        <ToastContainer />
      </GlobalProvider>
    </>
  );
}

export default App;
