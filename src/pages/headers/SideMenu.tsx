import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Logo from "../../assets/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HighlightIcon from "@mui/icons-material/Highlight";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/Schedule"; // Import the Schedule icon from mui/icons-material
import ArticleIcon from "@mui/icons-material/Article";
import { useAuth } from "../../context/useAuth";

interface SideMenuProps {
  open: boolean;
  toggleDrawer: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    toggleDrawer();
  };
  const { signOut } = useAuth();

  const handleLogout = () => {
    // Perform logout action here
    // Example: Clear session, remove tokens, etc.
    signOut();
    // navigate("/auth/login"); // Navigate to the login page after logout
    // You can customize the logout behavior according to your specific implementation
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleDrawer}
      anchor="left"
    >
      <List
        sx={{
          width: 250,
          color: (theme) => theme.palette.primary.light,
          cursor: "pointer",
        }}
      >
        {/* Menu Items */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={Logo}
            width={100}
            height={100}
            onClick={() => handleMenuItemClick("/dashboard")}
          />
        </div>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/dashboard")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "primary.light" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/highlight")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <HighlightIcon sx={{ color: "primary.light" }} />
          </ListItemIcon>
          <ListItemText primary="HighLight" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/users")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: "primary.light" }} />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/live")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <LiveTvIcon sx={{ color: "primary.light" }} />
          </ListItemIcon>
          <ListItemText primary="Live" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/fixture")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <ScheduleIcon sx={{ color: "primary.light" }} />{" "}
            {/* Using the Schedule icon */}
          </ListItemIcon>
          <ListItemText primary="Fixture" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => handleMenuItemClick("/news")}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <ArticleIcon sx={{ color: "primary.light" }} />{" "}
            {/* Using the News icon */}
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <Divider />
        {/* Logout */}
        <ListItem
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "primary.light" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
