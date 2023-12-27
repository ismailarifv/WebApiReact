import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { DataContext } from "../context/DataProvider";
import { useContext,useEffect,useState } from "react";

function ProductEdit() {
    const {id}=useParams()
    const {productData,categoryData} = useContext(DataContext);
    const [name, setName]=useState()
   const [price, setPrice]=useState()
   const [stock, setStock]=useState()
   const [categoryId, setCategoryId]=useState()
   const [isStatus, setIsStatus]=useState()


    const apiUrl = 'http://localhost:5098/api/products';
    const foundItem = productData.find((item) => {
        return item.id == id;
      });
      useEffect(()=>{
        setName(foundItem.name)
        setPrice(foundItem.price)
        setStock(foundItem.stock)
        setCategoryId(foundItem.categoryId)
        setIsStatus(foundItem.isStatus)
      },[])
     
      function putForm() {
        const putData = {
            name: name,
            price: price,
            stock: stock ,
            CategoryId:categoryId,
            IsStatus:isStatus
        };
      
        fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(putData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Gönderilen veri:', data);
            // Gönderilen veriyle yapılabilecek işlemler burada
          })
          .catch(error => {
            console.error('Veri gönderme işleminde bir hata oluştu:', error);
          });
      }
  return (
    <div className='text-center row'>
        <Link className='btn btn-warning' to={"/"}>Home</Link>
    <h1 className='mt-5'>Product Düzenle</h1>
    
    <label htmlFor="name"><b>Name</b></label>
  <input  onChange={(x)=>setName(x.target.value)} type="text" id="name" value={name}/><br/>
  <label htmlFor="price"><b>Price:</b> </label>
  <input onChange={(x)=>setPrice(x.target.value)} type="number" id="price" value={price}/><br/>
  <label htmlFor="name"><b>Stock:</b> </label>
  <input onChange={(x)=>setStock(x.target.value)} type="number" id="stock" value={stock}/><br/>
  <label htmlFor="name"><b>Category: </b></label>
  <select onChange={(x)=>setCategoryId(x.target.value)} value={categoryId} name="" id="">
    {
      categoryData &&
      categoryData.map((item)=>{
        return(
          <option key={item.id} value={item.id}>{item.name}</option>
        )
      })
    }
  </select><br />
  <label htmlFor="name"><b>Statü:</b></label>
  <input onChange={(x)=>setIsStatus(x.target.checked)} type="checkbox" id="IsStatus" value={isStatus}/><br/>
  
  <button className='btn btn-success' onClick={()=>putForm()}>Gönder</button>
  </div>
  )
}

export default ProductEdit