import { Button } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../funcrions/DataFetchers"
import { constants } from "../../Helpers/constantsFile"
import Table from "../../utils/Table"
import { addCategory, setCategory } from "../../redux/actions/categoryActions"


const Category = (props) => {
    const [categor, setCategor] = useState()
    const categories = useSelector(state => state.categories.categories)
    const [query, setQuery] = useState("")
    const [del, setDel] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {

    }, [categories])


    const columns = [
        {title: "Category Name", field: "categoryName"}
    ]
    const changeHandler = () => {
        setDel((state) => state + 1);
      };

    const addCategor = () => {
        axios.post(`${constants.baseUrl}/product-categories`, {
            categoryName: categor
        },{
          headers: {
            "authorization": constants.token
          }
        }).then(res => {
            alert("Successfully added category")
            setCategor("")
            setQuery("")
            dispatch(addCategory(res.data?.data?.createdCategory))
            setDel((state) => state + 1);
        }).catch(err => {
            alert(err.response?.data?.message)
        })
    }

    const handler = (data) => { 
        if (data?.length > 0) {
          return data.filter(
            (std) =>
            std.categoryName.toString().toLowerCase().includes(query)
          );
        } else {
          return
        }  
      };

    return (
        <div style = {{display: "flex", flexDirection: "column",
        gap: "20px", width: "320px"}}>

            <div style = {{width: "100%", display: "flex",
        flexDirectio: "row", alignItems: "center",
        justifyContent: "space-between"}}>
            <input
            value={query}
            type="text"
            placeholder="Category Name"
            style={{
              width: "70%",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "1px solid black",
            }}
            onChange={(e) => {
                setCategor(e.target.value)
                setQuery(e.target.value)
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
          }}
          onClick = {addCategor}
          variant="contained"
        >
         Add
        </Button>
        </div>

        <Table columns =  {columns} data = {handler(categories)} 
        page = "New Purchase" name = "Category" 
        url = "product-categories" change = {changeHandler} />

        </div>
    )
}

export default Category
