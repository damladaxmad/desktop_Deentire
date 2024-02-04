import { Button } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../funcrions/DataFetchers"
import { constants } from "../../Helpers/constantsFile"
import Table from "../../utils/Table"
import { setCategory } from "../../redux/actions/categoryActions"
import { setProductTypes } from "../../redux/actions/productTypesActions"
import { addServiceTypes, deleteServiceTypes, setServiceTypes } from "../../redux/actions/serviceTypesActions"


const Types = (props) => {
    const [serviceName, setServiceName] = useState()
    const [price, setPrice] = useState()
    const [query, setQuery] = useState("")
    const serviceTypes = useSelector(state => state.serviceTypes.serviceTypes)
    const [del, setDel] = useState(1)

    const dispatch = useDispatch()

    const columns = [
        {title: "Service Type", field: "name"},
        {title: "Price", field: "price", 
      render: (data) => <p> ${data?.price}</p>},
    ]
    const changeHandler = () => {
        setDel((state) => state + 1);
      };

    const addType = () => {
        axios.post(`${constants.baseUrl}/service-types`, {
            name: serviceName,
            price: price
        },{
          headers: {
            "authorization": constants.token
          }
        }).then(res => {
            alert("Successfully added type")
            setServiceName("")
            setPrice("")
            setQuery("")
            dispatch(addServiceTypes(res.data?.data?.createdServiceType))
            setDel((state) => state + 1);
        }).catch(err => {
            alert(err.response?.data?.message)
        })
    }

    const handler = (data) => { 
        if (data?.length > 0) {
          return data.filter(
            (std) =>
            std.name.toString().toLowerCase().includes(query)
          );
        } else {
          return
        }  
      };

      useEffect(() => {

      }, [serviceTypes])

    return (
        <div style = {{display: "flex", flexDirection: "column",
        gap: "20px", width: "370px"}}>

            <div style = {{width: "100%", display: "flex",
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between"}}>
            <input
            value={query}
            type="text"
            placeholder="Service Name"
            style={{
              width: "75%",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "1px solid black",
            }}
            onChange={(e) => {
                setServiceName(e.target.value)
                setQuery(e.target.value)
            }}
          />

            <input
            value = {price}
            type="text"
            placeholder="Price"
            style={{
              width: "30%",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "1px solid black",
              marginLeft: "10px"
            }}
            onChange={(e) => {
                setPrice(e.target.value)
            }}
          />

            <Button
          style={{
            width: "25%",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#4421DE",
            borderRadius: "10px",
            height: "45px",
            color: "white",
            marginLeft: "20px"
          }}
          onClick = {addType}
          variant="contained"
        >
         Add
        </Button>
        </div>

        <Table columns =  {columns} data = {handler(serviceTypes)} 
        page = "New Purchase" name = "Type" 
        url = "service-types" change = {changeHandler} />

        </div>
    )
}

export default Types
