import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import { UserProvider } from "./context/user.context";
import { CategoriesProvider } from "./context/Categories.context";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/home" element={<Home />}></Route> */}
          </Routes>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
