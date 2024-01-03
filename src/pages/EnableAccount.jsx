import { useEffect, useState } from "react";
import EnterCode from "../components/Entercode";
import { UseUser } from "../context/user.context";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const EnableAccount = () => {
  const { getUser } = UseUser();
  const [user, setUser] = useState({});
  const [accept, SetAccept] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUser({ data: params.username })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <div className="EnablaAccount">
      {accept ? (
        <EnterCode userInfo={user} RecoveAcc={true}></EnterCode>
      ) : (
        <div className="ContainerEnable">
          <div className="AlertPreEnable">
            <h2>Reactivar Cuenta</h2>
            <p>
              ¿Estás seguro que deseas reactivar tu cuenta? Al hacerlo, podrás
              acceder nuevamente a tu cuenta y todos los datos asociados.
            </p>
            <Stack direction="row" spacing={2} className="btnenable">
              <Button variant="contained" onClick={() => SetAccept(true)}>
                Aceptar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate("/home")}
              >
                Cancelar
              </Button>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnableAccount;
