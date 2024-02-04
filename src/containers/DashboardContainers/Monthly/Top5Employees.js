import { Typography } from "@material-ui/core"

const Top5Employees = (props) => {

    console.log(props.data)

    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "320px"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Last Month
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px"}}>
            Top employee services
            </Typography>

            {props.data?.map((order, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.name.substring(0, 20)}
                {order.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.services} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5Employees