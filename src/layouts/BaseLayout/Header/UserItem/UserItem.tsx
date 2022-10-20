import s from "./UserItem.module.css";
import mockUserPic from "../../../../assets/images/mock-user-pic.jpg";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Person, Logout } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { authThunks } from "../../../../store/auth-reducer";

export const UserItem = () => {
  const name = useAppSelector((state) => state.auth.user?.name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authThunks.logout());
  };

  return (
    <>
      <div className={s.wrapper} onClick={handleClick}>
        <span className={s.userName}> {name} </span>
        <img src={mockUserPic} alt="Ivan" />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: "1px solid #CFCFCF",
            overflow: "visible",
            boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.06)",
            mt: "10px",
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: -1,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              borderLeft: "1px solid #CFCFCF",
              borderTop: "1px solid #CFCFCF",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};
