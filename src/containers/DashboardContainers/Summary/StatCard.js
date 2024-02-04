import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { IoMdStats } from "react-icons/io";
import { useSelector } from "react-redux";
import { constants } from "../../../Helpers/constantsFile";
import { useState } from "react";
import { useEffect } from "react";
import LoadingPlaceHolder from "../Customer/LoadingPlaceHolder";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
      backgroundColor: "#F0F2FA",
    },
  };
});

var n = 14931;
console.log(n.toLocaleString());    

const StatCard = (props) => {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false)
  const customersFetched = useSelector(state => state.customers?.isDataFetched)
  const vendorsFetched = useSelector(state => state.vendors?.isDataFetched)

    useEffect(() => {
       if (customersFetched && vendorsFetched) setLoaded(true)
      }, [customersFetched, vendorsFetched]);

  const formatter = Intl.NumberFormat('en', {notation: "compact"})

  return (
      
    <div
      class = "myDiv"
      style={{
        minWidth: "23%",
        height: "95px",
        background:  "white",
        borderRadius: "10px",
        padding: "40px 5px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "12px",
        color: 'black'
        // boxShadow: "1px 1px 1px #9E9E9E"
      }}
    >
      <Avatar className={classes.avatar}>
        <IoMdStats style={{ color: "#01545C" }} />
      </Avatar>
      <div style={{display: "flex", gap: "4px", flexDirection: "column"}}>
      {!loaded && (
          <LoadingPlaceHolder
            extraStyles={{
              height: "15px",
              width: "80px",
              marginBottom: "16px",
              borderRadius: "10px",
            }}
          />
        )}
       {loaded && <p
          style={{
            margin: "0px",
            padding: "0px",
            fontSize: "20px",
            color:  "black",
            fontWeight: "600",
          }}
        >
          { props.value.isMoney ? 
          props.value.value < 0 ? `-${constants.moneySign}${props.value.value?.toFixed(2)?.toLocaleString("en-US")*-1}` : `${constants.moneySign}${props.value.value.toFixed(2)?.toLocaleString()}`
        : formatter.format(props.value.value)}
        </p>}
        {!loaded && (
          <LoadingPlaceHolder
            extraStyles={{
              height: "15px",
              width: "120px",
              marginBottom: "16px",
              borderRadius: "10px",
            }}
          />
        )}
      {loaded &&  <Typography
          style={{
            color: "#B9B9B9",
            margin: "0px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {props.value.label.toLowerCase()}
        </Typography>}
      </div>
    </div>
  );
};

export default StatCard;
