import { FormControl, MenuItem, TextField, Typography } from "@material-ui/core"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../funcrions/DataFetchers"
import { setPurchases } from "../../redux/actions/purchasesActions"
import Reports from "../../utils/Report"
import { setPurchases2 } from "../../redux/actions/purchases2Actions"


const PurchasesReport = (props) => {

    const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
    const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
    const [view, setView] = useState(1)
    const dispatch = useDispatch()
    const purchases = useSelector((state) => state.purchases2.purchases2);
   

    let number = 0
    let totalMoney = 0
    let cashMoney = 0
    let invoiceMoney = 0

    dispatch(
        setPurchases2(
          useFetch(
            `${props.name}/bydate/${startDate}/${endDate}`,
            view,
            `${props.name}`
          )
        )
      );

      purchases?.map(purchase => {
        number += 1
        totalMoney += purchase.total
        if (purchase.paymentType == "cash") cashMoney += purchase.total
        if (purchase.paymentType == "invoice") invoiceMoney += purchase.total
      })

    return (
        <div style = {{display: "flex", width: "100%", flexDirection: "column",
        gap: "20px"}}>
        
        <div style = {{width: "100%", display: "flex", gap: "10px"}}>
      <TextField
            variant="outlined"
            type="date"
            label = "Start Date"
            value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
            style={{ width: "15%", background: "white" }}
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
            style={{ width: "15%", background: "white" }}
            onChange={(e) => {
                setEndDate(e.target.value)
                setView(state => state + 1)
            }}
          />


          </div>

          <div style={{width: "100%", background: "white", display: "flex",
        padding: "20px", borderRadius: "8px", flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        border: "1px solid #898989"}}>
            
            <div style = {{display: "flex", flexDirection: "column", gap: "10px",
        width: "22%"}}>
                <div style = {{display: "flex", gap: "30px", width: "100%", 
            justifyContent: "space-between"}}>
                    <Typography style = {{fontSize: "16px"}}> Total {props.type}:</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>{number}</Typography>
                </div>

                <div style = {{display: "flex", gap: "30px", width: "100%", 
            justifyContent: "space-between"}}>
                    <Typography style = {{fontSize: "16px"}}> Total Money:</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>${totalMoney.toFixed(2)}</Typography>
                </div>
            </div>

        <div style = {{background: "3F0F2FA", 
    padding: "8px 25px", border: "1px solid #898989", borderRadius: "8px",
    display: "flex", gap: "10px"}}> 
        <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>From</Typography>
        <Typography style = {{ fontSize: "16px"}}>{startDate}</Typography>
        <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>To</Typography>
        <Typography style = {{ fontSize: "16px"}}>{endDate}</Typography>

        
    </div>



            <div style = {{display: "flex", flexDirection: "column", gap: "10px",
        width: "22%"}}>
                <div style = {{display: "flex", gap: "30px", width: "100%", 
            justifyContent: "space-between"}}>
                    <Typography style = {{fontSize: "16px"}}> Cash Money:</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>${cashMoney.toFixed(2)}</Typography>
                </div>

                <div style = {{display: "flex", gap: "30px", width: "100%", 
            justifyContent: "space-between"}}>
                    <Typography style = {{fontSize: "16px"}}> Invoice Money:</Typography>
                    <Typography style = {{fontWeight: "bold", fontSize: "16px"}}>${invoiceMoney.toFixed(2)}</Typography>
                </div>
            </div>
          </div>

          <Reports startDate = {startDate} endDate = {endDate}
          purchases = {purchases} name = {props.type} type = "cash"
          kind = "Report"/>
       
        </div>
    )
}

export default PurchasesReport