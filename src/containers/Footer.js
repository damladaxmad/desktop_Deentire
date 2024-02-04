import { Typography, Divider } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        padding: "17px",
      }}
    >
      <Divider />
      <Typography style={{ color: "#B9B9B9" }}>
        2022 &copy; Inventory System - System
      </Typography>

      <div style={{ display: "flex", gap: "20px", marginLeft: "590px" }}>
        <Typography style={{ color: "#B9B9B9" }}>About</Typography>
        <Typography style={{ color: "#B9B9B9" }}>Support</Typography>
        <Typography style={{ color: "#B9B9B9" }}>Purchase</Typography>
      </div>
    </div>
  );
};

export default Footer;
