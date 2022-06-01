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
import { useSelector } from "react-redux";
import NewStore from "./components/NewStore";




function App() {
       const state = useSelector((state) => {
         return {
           isLoggedIn: state.loginReducer.isLoggedIn,
           token: state.loginReducer.token,
           user_id: state.loginReducer.user_id,
           role: state.loginReducer.role,
         };
       });
  return (
    <div className="App ">
      {state.isLoggedIn ? <Navigation /> : <></>}
      <div className="Home">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store/:id" element={<Store />} />
          <Route path="/new_store" element={state.role==1?<NewStore />:<></>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
