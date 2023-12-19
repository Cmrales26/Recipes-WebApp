import {
  AppBar,
  Toolbar,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { logout, user } = UseUser();
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

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          {/* <Link to="#">
          <p>Recetas NM</p>
        </Link> */}
          <Stack direction={"row"} spacing={5}>
            <TextField
              size="small"
              label="Buscar"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <FontAwesomeIcon className="SearchIcon" icon={faSearch} />
                  </IconButton>
                ),
              }}
            />
            <Tooltip title="Configuración Cuenta">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faChevronDown} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
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
                <hr />
              </MenuItem>

              <MenuItem
                onClick={() =>
                  Navigate(`/Profile/${user.username}/configuration`)
                }
              >
                {" "}
                <FontAwesomeIcon
                  icon={faGear}
                  className="seeUserInfo seeUserInfo-small"
                />
                <div className="usernameinfo">Configuración</div>{" "}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {" "}
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="seeUserInfo seeUserInfo-small "
                />
                <div className="usernameinfo">Cerrar Sesión</div>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
