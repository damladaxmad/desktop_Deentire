import {
    Avatar,
    Typography,
    makeStyles,
  } from "@material-ui/core";
   import React from "react";
   import profile from "../../assets/images/profileDrawer.jpg"

  const useStyles = makeStyles((theme) => {
    return {
      
      avatar: {
        marginLeft: theme.spacing(2),
        cursor: "pointer",
      },
  
      toolbar: theme.mixins.toolbar,
    };
  });
  
  const BottomProfile = () => {
    const classes = useStyles();

    return (
     <div
      style={{
        marginTop: "100px",
        position: "absolute",
        width: "193px",
        height: "60px",
        left: "15px",
        bottom: "28px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}
    >
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: "#041E42" }}
      >
        <img src = {profile} style = {{
            width: '100%',
            height: '100%',
        }}/>
      </Avatar>
      <div>
      <p style={{margin: 0, fontSize: "12px",
    fontWeight: "600"}}> Najmo Ali</p>
      <Typography style = {{
          color: "rgba(255, 255, 255, 0.5)",
          margin: "0px", fontSize: "12px"
      }}> support manager</Typography>
      </div>
   
    </div>
        
    );
  };
  
  export default BottomProfile;
  