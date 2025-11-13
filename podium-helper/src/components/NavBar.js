import React from "react";
import { Box, Toolbar, AppBar } from "@mui/material";
import SRO from "../images/SRO.jpg";
import "../Styling/navBar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar">
      <AppBar position="static" sx={{ bgcolor: "#FF0000" }}>
        <Toolbar>
          <div className="navbar-links">
            <a className="img-container" href="https://www.sro-america.com/">
              <img src={SRO} alt="SRO" />
            </a>
            <Link to="/">New Podium</Link>
            <Link to="/Competitors">Competitors</Link>
            <Link to="/Results">Results</Link>
            <Link to="/entryManager">Admin</Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
