import { createContext,useState,useEffect } from "react";
import PropTypes from 'prop-types'
export const DataContext=createContext();



function DataProvider({children}) {

    const[productData,setProductData]=useState([])
    const[categoryData,setCategoryData]=useState([])
  
  useEffect(()=>{
  // eslint-disable-next-line no-unused-vars
  const fetchData =  async () =>{
    try {
      const response = await fetch("http://localhost:5098/api/products");
      const result = await response.json();
      setProductData(result)
    } catch (error) {
      console.error("Error",error)
    }
    
  
  }
  fetchData()
  const fetchData2 =  async () =>{
    try {
      const response = await fetch("http://localhost:5098/api/category");
      const result = await response.json();
      setCategoryData(result)
    } catch (error) {
      console.error("Error",error)
    }
   
  }
  fetchData2()
  },[])
      

  return (
    <DataContext.Provider
    value={{
      productData,
      categoryData
       
       
    }}
    >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider

DataProvider.propTypes ={
    children:PropTypes.node
 }