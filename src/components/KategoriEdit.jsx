import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { DataContext } from "../context/DataProvider";
import { useContext,useState,useEffect } from "react";
function KategoriEdit() {
    const {id}=useParams()
    const {categoryData} = useContext(DataContext);
    const [newName, setNewName]=useState()
   const [newStatus, setNewStatus]=useState()
    const apiUrl = 'http://localhost:5098/api/category';
    const foundItem = categoryData.find((item) => {
        return item.id == id;
      });
     useEffect(()=>{
        setNewName(foundItem.name)
        setNewStatus(foundItem.isStatus)
     },[])
      function putForm() {
        const putData = {
          name: newName,
          IsStatus: newStatus
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
    <div>
        <Link className='btn btn-warning' to={"/"}>Home</Link>
<input  onChange={(x)=>setNewName(x.target.value)}type="text" id="name" value={newName} />
<input  onChange={(x)=>setNewStatus(x.target.checked)}type="checkbox" id="IsStatus" checked={newStatus} />
<button  onClick={()=>putForm()}>Gönder</button>
    </div>
  )
}

export default KategoriEdit