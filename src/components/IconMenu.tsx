import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Session,
  loadSessionsFromLocalStorage,
  saveSessionsToLocalStorage,
} from "../helpers/SessionHelpers";
import { useState } from "react";

interface IconMenuProps {
  timerSession: string;
  setTimes: React.Dispatch<React.SetStateAction<number[]>>;
}

const IconMenu = ({ timerSession, setTimes }: IconMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
    const sessions = loadSessionsFromLocalStorage();
    if (sessions.length === 0) {
      return;
    }
    const updatedSession: Session = { times: [] };
    sessions[+timerSession - 1] = updatedSession;
    saveSessionsToLocalStorage(sessions);
    setTimes([]);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenuItemClick}>Clear session</MenuItem>
      </Menu>
    </div>
  );
};

export default IconMenu;
