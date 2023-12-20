import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserProvider } from "./context/user.context";
import { CategoriesProvider } from "./context/Categories.context";
import Protectedroute from "./Protectedroute";
import Profile from "./pages/Profile";
import ProfileConfig from "./pages/ProfileConfig";
import EditUser from "./pages/EditUser";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<Protectedroute />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/Profile/:username" element={<Profile />}></Route>
              <Route
                path="/Profile/:username/configuration"
                element={<ProfileConfig></ProfileConfig>}
              ></Route>
              <Route
                path="/Profile/:username/editAccount"
                element={<EditUser />}
              ></Route>
            </Route>
          </Routes>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
