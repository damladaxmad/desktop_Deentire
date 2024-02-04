import { Typography } from "@material-ui/core"
import {MdKeyboardArrowRight} from "react-icons/md"

const OrderUpdates = (props) => {

    console.log(props.data)

    const orders = [
        {name: "Pending orders", value: 5},
        {name: "On-service orders", value: 5},
        {name: "Finished orders", value: 5},
        {name: "Taken orders", value: 5},
    ]

    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "30%"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Today
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px"}}>
            New order updates
            </Typography>

            {props.data?.map((order, index) => {
                if (order.status == "invoiced" || order.status == "taken" 
            || order.status == "left" || order.status == "cancelled") return
                const str = order.status;
                const str2 = str.charAt(0).toUpperCase() + str.slice(1);
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <MdKeyboardArrowRight style = {{ fontSize: "22px",
                color: "#575656"}} /> 
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {str2} Orders </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.orders} </Typography>
                </div>
                })}


        </div>
    )
}

export default OrderUpdates