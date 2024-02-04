import { TextField, Typography } from "@material-ui/core";
import Reports from "../utils/Report";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { setPurchases } from "../redux/actions/purchasesActions";
import useFetch from "../funcrions/DataFetchers";
import PurchasesReport from "../containers/Reports/PurchasesReport";
import GeneralReport from "../containers/ReportContainers/GeneralReports";
import PersonalReport from "../containers/ReportContainers/PersonalReport";

const ReportsPage = () => {
  const titles = ["customers", "vendors", "raage", "dhexe", "amaano"];
  const [currentTitle, setCurrentTitle] = useState("customers");
  const [view, setView] = useState();
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );

  const clickHandler = (title) => {
    setCurrentTitle(title);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "92%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          gap: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          width: "100%",
          background: "white",
          padding: "20px 50px",
          borderRadius: "8px",
        }}
      >
        {titles?.map((title) => {
          return (
            <div
              style={{
                background: currentTitle == title ? "#03656F" : "#F0F2FA",
                color: currentTitle == title ? "white" : "black",
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                height: "38px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => clickHandler(title)}
            >
              <Typography style={{ fontWeight: "bold" }}> {title} </Typography>
            </div>
          );
        })}
      </div>

        
      {
        <PersonalReport
          name={currentTitle}
          type={`${currentTitle.charAt(0).toUpperCase()}${currentTitle.slice(
            1
          )}`}
        />
      }
    </div>
  );
};

export default ReportsPage;