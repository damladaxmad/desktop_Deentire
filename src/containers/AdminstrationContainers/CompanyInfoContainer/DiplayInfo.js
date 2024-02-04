import React, {useEffect, useState} from "react"
import jaabirLogo from "../../../assets/images/jaabirLogo.jpg";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

const DisplayInfo = () => {

    const [data, setData] = useState()
  const companyInfo = useSelector(state => state.companyInfo.companyInfo)
  
    useEffect(()=>{
      setData(companyInfo)
    }, [companyInfo])

    return (
        <div style={{display: "flex", flexDirection: "column",
        justfiyContent: "center", alignItems: "center",
        gap: "20px", margin: "20px 0px", marginBottom: "30px"}}>
            
               <img
              src={companyInfo.imageURl}
              style={{
                width: "150px",
                height: "150px",
              }}
            />
            
              <p style={{margin: "0px", fontWeight: "700",
                fontSize:"25px"}}>{data?.name}</p>
              <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.address}</p>
            <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.email}</p>
            <p style={{margin: "0px", fontWeight: "500",
                fontSize:"22px"}}>{data?.phone}</p>
        </div>
    )
}

export default DisplayInfo