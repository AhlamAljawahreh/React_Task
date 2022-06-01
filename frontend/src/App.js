import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Store from "./components/Store";



function App() {
  return (
    <div className="App ">
      <Navigation />
      <div className="Home">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store/:id" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
