import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import MyTable from "../../utils/MyTable"
import StockTable from "../ProductContainers/StockTable"

const StockSummary = (props) => {

   let totalPrice = 0
   props.data?.map(data => {
    totalPrice += data.totalCost
   })

   let totalItems = 0
   props.data?.map(data => {
    totalItems += data.quantity
   })

   

    const columns = [
        { title: "Product Name", field: "name", width: "4%" },
        { title: "Quantity", field: "quantity" },
        { title: "Unit Price", field: "unitPrice" },
        { title: "Sale Price", field: "salePrice" },
        { title: "Total Cost", field: "totalCost" },
    ]

    return (
        <div style = {{
            background: "white",
            borderRadius: "8px",
            padding: "30px 50px",
            display: "flex",
            gap: "30px",
            flexDirection: "column",
            width: "100%"
        }}>
            <div style = {{display: "flex", justifyContent: "space-between"}}>
            <div>
                <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> {props.type} Summary</Typography>
                <Typography style = {{
                    fontSize: "18px",
                    color: "#6C6C6C"
                }}> {props.data?.length} items</Typography>
            </div>
            <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> ${totalPrice?.toFixed(2)}</Typography>
            </div>
           
        <StockTable columns = {columns} 
            kind = "Report" data = {props.data} way = "summary"/>
        </div>
    )
}

export default StockSummary