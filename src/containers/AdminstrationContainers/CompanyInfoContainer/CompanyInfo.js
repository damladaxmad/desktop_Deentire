import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import DisplayInfo from "./DiplayInfo";
import InfoPopUp from "./InfoPopUp";
import axios from "axios";
import { useSelector } from "react-redux";

const parentDivStyle = {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0px",
    background: "white",
    width: "92%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "8px",
    flexDirection: "column",
    padding: "20px"
  };

const CompanyInfo = () => {

  const [hideButton, setHideButton] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [display, setDisplay] = useState(false)
  const [data, setData] = useState()
  const [update, setUpdate] = useState(false)
  const companyInfo = useSelector(state => state.companyInfo.companyInfo)

  const buttonHandler = () => {
    if (data){
      setUpdate(true)
    }
    if (!data) {
      setShowCreate(true)
    }
    setHideButton(true)
    setDisplay(false)
  }

  const handleHide = () => {
    setUpdate(false)
    setHideButton(false)
    setShowCreate(false)
    setDisplay(true)
  }

  useEffect(()=>{
    setData(companyInfo)
  }, [companyInfo])
  
    return (
        <div style={parentDivStyle}>
          {showCreate && <InfoPopUp hide = {handleHide}/>}
         {update && <InfoPopUp update = {update} data = {data}
         hide = {handleHide}/> }
         {data && !update && <DisplayInfo/>}
         {/* {display && <DisplayInfo/>} */}
         
          {!hideButton && <Button
          style={{
            backgroundColor: "#2F49D1",
            fontSize: "18px",
            fontWeight: "550",
            color: "white",
            width: "150px",
            height: "40px",
            marginBottom: data ? "20px" : null
          }}
          onClick={buttonHandler}
          variant="contained"
        >
            {data || display ? "Update" : "Create"}
        </Button>}
        </div>
    )
}

export default CompanyInfo