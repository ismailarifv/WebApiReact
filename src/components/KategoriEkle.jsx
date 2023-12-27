import { Link } from 'react-router-dom'
import { useState } from 'react';
function KategoriEkle() {
    const [name, setName]=useState()
   const [isStatus, setIsStatus]=useState()
   const apiUrl = 'http://localhost:5098/api/category';
        
        
      
   function postform() {
       
         
           const postData = {
             name: name,
             IsStatus:isStatus
   
           };
           
           fetch(apiUrl, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(postData)
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
  <>
<Link className='' to={"/"}>Home</Link>
    <div>KategoriEkle</div>
    <input  onChange={(x)=>setName(x.target.value)} type="text" id="name" placeholder="name"/>

  <input onChange={(x)=>setIsStatus(x.target.checked)} type="checkbox" id="IsStatus" placeholder="IsStatus"/>
  
  <button  onClick={()=>postform()}>Gönder</button>
    </>
  )
}

export default KategoriEkle