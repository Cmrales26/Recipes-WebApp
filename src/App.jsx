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
import UpdatePass from "./pages/UpdatePass";
import CodeValidation from "./pages/CodeValidation";
import TryLoginAs from "./pages/TryLoginAs";
import PinResetPass from "./pages/PinResetPass";
import Recoverypass from "./pages/Recoverypass";
import DisableAccount from "./pages/DisableAccount";
import EnableAccount from "./pages/EnableAccount";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/forgot" element={<TryLoginAs />}></Route>
            <Route
              path="/login/forgot/entercode"
              element={<PinResetPass />}
            ></Route>
            <Route
              path="/login/forgot/entercode/RecoveryPass"
              element={<Recoverypass />}
            ></Route>
            <Route
              path="/enableAccount/:username"
              element={<EnableAccount />}
            ></Route>

            {/* rutas protegidas */}
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
              <Route
                path="/Profile/:username/ChangePassword"
                element={<UpdatePass />}
              ></Route>
              <Route
                path="/Profile/:username/ChangePassword/VerifacationCode"
                element={<CodeValidation />}
              ></Route>
              <Route
                path="/Profile/:username/ChangePassword"
                element={<UpdatePass />}
              ></Route>
              <Route
                path="/DisableAccount/:username"
                element={<DisableAccount />}
              ></Route>
            </Route>
          </Routes>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
