import { FormControl, MenuItem, TextField, Typography } from "@material-ui/core"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../funcrions/DataFetchers"
import { setPurchases } from "../../redux/actions/purchasesActions"
import Reports from "../../utils/Report"
import { setPurchases2 } from "../../redux/actions/purchases2Actions"
import MyTable from "../../utils/MyTable"
import SummaryReport from "./SummaryReport"


const GeneralReport = (props) => {

    const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
    const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
    const [view, setView] = useState(1)
    const dispatch = useDispatch()
    const purchases = useSelector((state) => state.purchases2.purchases2);
    const reportTypes = ["summery", "bydate"]
    const [type, setType] = useState(reportTypes[0])

    const typeHandler = (e) => {
      setType(e.target.value)
    }

    // useEffect(() => {

    // }, [view])

    let number = 0
    let totalMoney = 0
    let cashMoney = 0
    let invoiceMoney = 0

    dispatch(
        setPurchases2(
          useFetch(
            `${props.name}/${type}/${startDate}/${endDate}`,
            view,
            `${props.name}`
          )
        )
      );
          
     console.log(purchases)
      purchases?.map(purchase => {
        number += 1
        totalMoney += purchase.total
        if (purchase.paymentType == "cash") cashMoney += purchase.total
        if (purchase.paymentType == "invoice") invoiceMoney += purchase.total
      })

    return (
        <div style = {{display: "flex", width: "100%", flexDirection: "column",
        gap: "20px"}}>
        
     

        <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          border: "1px solid #7F7F7F",
          width: "100%",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          alignItems: "center"
        }}
      >

<TextField
            variant="outlined"
            type="date"
            label = "Start Date"
            value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
            style={{ width: "20%", background: "white" }}
            onChange={(e) => {
                setStartDate(e.target.value)
                setView(state => state + 1)
            }}
          />
          <TextField
             variant="outlined"
            type="date"
            label = "End Date"
            value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
            placeholder="Search"
            style={{ width: "20%", background: "white" }}
            onChange={(e) => {
                setEndDate(e.target.value)
                setView(state => state + 1)
            }}
          />


          <TextField
            variant="outlined"
            size='small'
            select
            style={{ width: "20%", color: "black", }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            // label="Select Type"
            onChange={typeHandler}
          >
            {reportTypes?.map((type, index) => (
              <MenuItem value={type} key={index}>
                {type}
              </MenuItem>
            ))}
          </TextField>
            {type == "bydate" && <div style = {{display: "flex", gap: "20px"}}>
                    <Typography style = {{fontSize: "16px"}}> {`${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}`}:</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>{number}</Typography>
                </div>}

                {type == "bydate" &&  <div style = {{display: "flex", gap: "20px"}}>
                    <Typography style = {{fontSize: "16px"}}> Total</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>${totalMoney?.toFixed(2)}</Typography>
                </div>}
      
          
    </div>

          {type == "bydate" && <Reports startDate = {startDate} endDate = {endDate}
          purchases = {purchases} name = {props.type} type = "cash"
          kind = "Report"/>}
          {(type == "summery" && purchases?.length > 0 ) && <SummaryReport type = {props.type} data = {purchases}/>}
       
        </div>
    )
}

export default GeneralReport