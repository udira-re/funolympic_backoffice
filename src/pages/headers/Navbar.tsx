import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./SideMenu";

// import LanguageIcon from "@mui/icons-material/Language";

import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ padding: 0, margin: 0 }}>
        <Toolbar sx={{ padding: 0 }}>
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* {isAuthenticated && ( */}
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => handleMenuItemClick("/dashboard")}
          >
            funOlympic
          </Typography>
          {/* <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          ></div> */}

          {/* )} */}
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <SideMenu open={drawerOpen} toggleDrawer={toggleDrawer} />
      )}
    </>
  );
};

export default Navbar;
