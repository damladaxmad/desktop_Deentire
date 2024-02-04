import { Typography } from "@mui/material"
import PatientCard from "./PatientCard"


const TestComponanats = (props) => {


    return (
        <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "95%",
          margin: "30px auto",
          flexWrap: "wrap",
          gap: "25px"
        }}
      >
            
            {props.data?.map(d => {
               return  <PatientCard data = {d} 
               divClick = {(data) => props.divClick(data)}
               change = {() => {
                props.change()
               }}/>
            })}
        </div>
    )
}

export default TestComponanats