import { Typography } from "@mui/material"
import {MdOutlineDelete} from "react-icons/md"
import { deleteFunction } from "../../funcrions/deleteStuff"
import { constants } from "../../Helpers/constantsFile"
import { useDispatch } from "react-redux"
import { deletePatient } from "../../redux/actions/patientsActions"

const PatientCard = (props) => {
    
    const dispatch = useDispatch()

    const deleteTestFun = () => {
        deleteFunction(
          "Delete Patient", props.data.name, `${constants.baseUrl}/patients/${props.data.id}`,
          () => {
            dispatch(deletePatient(props.data))
          },
          () => {
            props.change()
          }
        )
        }

    return (
        <div style = {{
            width: "31.5%",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            background: "White",
            borderBottom: "6px solid #4421DE",
        }}
        >
            
            <div style = {{display: "flex", width: "100%",
        justifyContent: "space-between", alignItems: "center"}}>
            <Typography style = {{
                fontWeight: "700",
                fontSize: "20px",
                color: "#4421DE",
                cursor:"pointer"
            }}
            onClick = {()=> props.divClick(props.data)}> 
            {props.data?.patientId >= 10 ? "0" : "00"}{props.data?.patientId}
            </Typography>
            <MdOutlineDelete style = {{color: "#F22417", fontSize: "24px",
                cursor: "pointer"}} onClick = {() => deleteTestFun()}/>
            </div>
            <div style = {{cursor: "pointer"}}
            onClick = {()=> props.divClick(props.data)}>

            <Typography style = {{
                fontWeight: "600",
                fontSize: "18px",
            }}> {props.data.name}</Typography>
            <Typography style = {{
                fontSize: "18px",
                color: "#696767"
            }}> {props.data?.phone} - {props.data.age} Jir</Typography>
            </div>

        </div>

    )
}

export default PatientCard