import { Button, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import MyTable from "../../utils/MyTable"
import PrintReport from "../Reports/PrintReport"
import { useState } from "react"

const PersonalReport = (props) => {

    const customers = useSelector(state => state.customers.customers)
    const vendors = useSelector(state => state.vendors.vendors)
    const amaano = useSelector(state => state.amaano.amaano)
    const [showPrint, setShowPrint] = useState(false)

    let customerTotal = 0
    let vendorTotal = 0
    let raageTotal = 0
    let dhexeTotal = 0
    let amaanoTotal = 0

    let realCustomers = []
    customers?.map(customer => {
        if (!customer?.type || customer?.type == "deynle")
        if (customer.balance > 0) {
        realCustomers.push(customer)
        customerTotal += customer.balance
        }
    })

    let realAmaano = []
    amaano?.map(customer => {
        if (customer.balance > 0) {
        realAmaano.push(customer)
        amaanoTotal += customer.balance
        }
    })

    let realRaage = []
    customers?.map(customer => {
        if (customer?.type == "raagay")
        if (customer.balance > 0) {
        realRaage.push(customer)
        raageTotal += customer.balance
        }
    })

    let realDhexe = []
    customers?.map(customer => {
        if (customer?.type == "dhexe")
        if (customer.balance > 0) {
        realDhexe.push(customer)
        dhexeTotal += customer.balance
        }
    })

    let realVendors = []
    vendors?.map(vendor => {
        if (vendor.balance > 0){
        realVendors.push(vendor)
        vendorTotal += vendor.balance
        }
    })

    const decideTotal = () => {
        if (props.type == "Customers") return customerTotal
        if (props.type == "Vendors") return vendorTotal
        if (props.type == "Raage") return raageTotal
        if (props.type == "Dhexe") return dhexeTotal
        if (props.type == "Amaano") return amaanoTotal
        return 0
    }
    const decideCount = () => {
        if (props.type == "Customers") return realCustomers?.length
        if (props.type == "Vendors") return realVendors?.length
        if (props.type == "Raage") return realRaage?.length
        if (props.type == "Dhexe") return realDhexe?.length
        if (props.type == "Amaano") return realAmaano?.length
        return 0
    }

    const columns = [
        { title: "Full Name", field: "name", width: "4%" },
        { title: "Phone Number", field: "phone" },
        { title: "Address", field: "district" },
        { title: "Balance", field: "balance" },
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
                }}> {props.type} Report</Typography>
                <Typography style = {{
                    fontSize: "18px",
                    color: "#6C6C6C"
                }}> {decideCount()} {props.name}</Typography>
            </div>
            <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> ${decideTotal().toFixed(2)}</Typography>
            </div>

            {/* {showPrint && <PrintReport data = {realCustomers}
            hideModal = {()=> {setShowPrint(false)}}/>}    
            <button onClick = {()=> {setShowPrint(true)}}> print</button> */}
           
           {props.name == "customers" && <MyTable columns = {columns} data = {realCustomers}
            kind = "Report"/>}
           {props.name == "vendors" && <MyTable columns = {columns} data = {realVendors}
            kind = "Report"/>}

           {props.name == "raage" && <MyTable columns = {columns} data = {realRaage}
            kind = "Report"/>}
           {props.name == "dhexe" && <MyTable columns = {columns} data = {realDhexe}
            kind = "Report"/>}
           {props.name == "amaano" && <MyTable columns = {columns} data = {realAmaano}
            kind = "Report"/>}

        </div>
    )
}

export default PersonalReport