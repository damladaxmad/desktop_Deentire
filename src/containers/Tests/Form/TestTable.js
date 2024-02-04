import { useSelector } from "react-redux";
import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"
import { memo, useEffect } from "react";

const columns = [
    { title: "Test Name", field: "name", width: "33%" },
    { title: "Patient", field: "patient", width: "33%",
  render: (data) => <p>{data?.patient?.name}</p> },
    { title: "Test Note", field: "note", width: "33%" },
  ]



const TestTable = (props) => {

    const tableTestData = useSelector(state => state.tableTestData.tableTestData)

    const handler = (data) => { 
        if (data?.length > 0) {
          return data
        } else {
          return
        }  
      };

      console.log(tableTestData)

      useEffect(() => {

      }, [tableTestData])



    return (
        <div style={{width: "100%", marginTop: "15px"}}>
            <MyTable columns = {columns} data = {handler(tableTestData)} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default memo(TestTable)