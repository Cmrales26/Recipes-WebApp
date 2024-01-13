import {
  AppBar,
  Toolbar,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faChevronDown,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UseUser } from "../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import Imagotipo from "/images/Imagotipo.svg";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { logout, user, isAuth, loading, AdminView, setAdminView } = UseUser();
  const Navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (loading) {
    return;
  }

  const changeDashboard = () => {
    setAdminView("Dashboard");
  };
  const changeCreate = () => {
    setAdminView("CreateRecipe");
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/home">
            <figure>
              <img src={Imagotipo} alt="Logotipo de la pagina RC" />
            </figure>
          </Link>

          {isAuth ? (
            user.rol === "user" ? (
              <Stack direction={"row"} spacing={5}>
                <TextField
                  size="medium"
                  label="Buscar Receta"
                  focused
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <FontAwesomeIcon
                          className="SearchIcon"
                          icon={faSearch}
                        />
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
            ) : (
              <Stack direction={"row"} spacing={2}>
                <Button
                  onClick={changeDashboard}
                  variant={AdminView === "Dashboard" ? "contained" : "text"}
                >
                  DashBoard
                </Button>
                <Button
                  onClick={changeCreate}
                  variant={AdminView === "CreateRecipe" ? "contained" : "text"}
                >
                  Create Recipe
                </Button>
              </Stack>
            )
          ) : (
            <Stack direction={"row"} spacing={5}>
              <TextField
                size="medium"
                label="Buscar Receta"
                focused
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <FontAwesomeIcon className="SearchIcon" icon={faSearch} />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
          )}

          {isAuth ? (
            <Stack>
              <Tooltip title="Configuración Cuenta">
                <IconButton
                  className="UserHomeIcon"
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {user.profilePictureUrl ? (
                    <img
                      src={user.profilePictureUrl}
                      alt="Profile"
                      onError={(e) => console.log("Error loading image", e)}
                      className="AvatarImage"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}

                  <FontAwesomeIcon icon={faChevronDown} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                className="account-menu-class"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => Navigate(`/Profile/${user.username}`)}
                  className="SeeUser"
                >
                  <FontAwesomeIcon icon={faUser} className="seeUserInfo" />
                  <div className="usernameinfo">
                    {user.name + " " + user.lastname}
                  </div>
                </MenuItem>

                <MenuItem
                  onClick={() =>
                    Navigate(`/Profile/${user.username}/configuration`)
                  }
                  className="SeeConfig"
                >
                  {" "}
                  <FontAwesomeIcon icon={faGear} className="faGear" />
                  <div className="usernameinfo">Configuración</div>{" "}
                </MenuItem>
                <MenuItem onClick={handleLogout} className="SeeLogout">
                  {" "}
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="faArrowRightFromBracket"
                  />
                  <div className="usernameinfo">Cerrar Sesión</div>
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Stack>
              <Button
                variant="contained"
                type="button"
                onClick={() => Navigate("/login")}
              >
                Iniciar Sesion
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
