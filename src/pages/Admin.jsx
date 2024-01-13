import Navbar from "../components/Navbar";
import CreateRecipe from "../components/admin/CreateRecipe";
import { UseUser } from "../context/user.context";
const Admin = () => {
  const { AdminView } = UseUser();
  return (
    <>
      <Navbar></Navbar>
      <div className="AdmiContent">
        {AdminView === "Dashboard" ? <h1>HOLA</h1> : <CreateRecipe />}
      </div>
    </>
  );
};

export default Admin;
