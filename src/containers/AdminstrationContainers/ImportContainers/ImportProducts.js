import { Button } from "@material-ui/core";
import axios from "axios";
import React, {useState} from "react";
import * as XLSX from 'xlsx'
import { constants } from "../../../Helpers/constantsFile";

const parentDivStyle = { display: "flex", alignItems: "center",
justifyContent: "space-between",  gap: "0px", padding: "20px",
background: "white", width: "95%", margin: "auto",
marginTop: "20px", borderRadius: "8px 8px 0px 0px",
flexDirection: "column"
}

const ImportProducts = () => {
    const [excelFile, setExcelFile]=useState(null);
    const [excelFileError, setExcelFileError]=useState(null);  
    const [excelData, setExcelData]=useState(null);
    const fileType=['application/vnd.ms-excel'];

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("It is called")
        if(excelFile!==null){
            console.log("It is in")
          const workbook = XLSX.read(excelFile,{type:'buffer'});
          const worksheetName = workbook.SheetNames[0];
          const worksheet=workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          setExcelData(data);
        }
        else{
          setExcelData(null);
        }
      }

      console.log(excelData)

    const handleFile = (e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
          // console.log(selectedFile.type);
          if(selectedFile&&fileType.includes(selectedFile.type)){
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
              setExcelFileError(null);
              setExcelFile(e.target.result);
            } 
            
        }
        else{
            setExcelFileError('Please select only excel file types');
            setExcelFile(null);
        }
    }
    else{
        console.log('plz select your file');
    }
   
      }

      const uploadHandler = () => {
        axios.post(`${constants.baseUrl}/products`, excelData).then(()=> {
            alert("Successfully imported")
        }).catch((err)=> {
            alert(err.data.message)
        })
      }

     

    return (

        <div style={parentDivStyle}>

      <form autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>

        {excelData?.map(data => (
            <div style={{display: "flex", gap: "20px",
            width: "40%", justifyContent: "space-between"}}>
                <p> {data.name}</p>
                <p> {data.quantity}</p>
                <p> {data.unitPrice}</p>
                <p> {data.salePrice}</p>
            </div>
        ))}

        <Button onClick = {uploadHandler}
        variant = "contained" style = {{background: "blue"}}>
            Upload
        </Button>

        </div>
    )
}

export default ImportProducts