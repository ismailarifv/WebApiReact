
import { Link } from 'react-router-dom'
import { DataContext } from "../context/DataProvider";
import { useContext,useEffect, useState } from "react";
function Home() {
  const {categoryData} = useContext(DataContext);
  const [dataPagination,setDataPagination]=useState([])
  const [page,setPage]=useState(1)
  const [search,setSearch]=useState("")
  
  function increase() {
    console.log(dataPagination.pageCount);
    if (page<dataPagination.pageCount) {
      setPage(page+1)
    }
    
  }
  function sera(x){
    setSearch(x)
    setPage(1)
  }
  function decrease() {
    if (page>1) {
      setPage(page-1)
    }
    
  }
  function deleteId(id) {
    const apiUrl = `http://localhost:5098/api/${id}`;
    
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Ürün başarıyla silindi');
        // Silinen ürünle yapılabilecek işlemler burada
      })
      .catch(error => {
        console.error('Ürün silinirken bir hata oluştu:', error);
      });
  }
  useEffect(()=>{
    // eslint-disable-next-line no-unused-vars
    const fetchData =  async () =>{
      try {
        const response = await fetch(`http://localhost:5098/api/ProductPagination/${page}/${search}`);
        const result = await response.json();
        setDataPagination(result)
      } catch (error) {
        console.error("Error",error)
      }
    }
    fetchData()
    
  })
  
  return (
    <>
    <h2>Products</h2>
    
    <input onChange={(x)=>sera(x.target.value) } type="text" id='search' className='form-control' />
    <Link to={"/product-ekle"}>
<button className='btn btn-success'>Product Ekle</button>
</Link>
     <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">CategoryId</th>
      <th scope="col">IsStatus</th>
      <th scope='col'>Settings</th>
      <th scope='col'>Edit</th>
    </tr>
  </thead>
  <tbody>
  {
  
//  search ?
  dataPagination && dataPagination.searchFilter &&
    dataPagination.searchFilter.map((item,i)=>{
      return(
      
      <tr key={i}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.stock}</td>
      <td>{item.categoryId}</td>
      <td>{item.isStatus?"Var":"Yok"}</td>
      <td><button onClick={()=>deleteId("products/"+item.id)} className='btn btn-danger'>Delete</button></td>
      <td><Link to={`/product-edit/${item.id}`}>Edit</Link></td>
    </tr>
      )
    })
    // :
    
    // dataPagination && dataPagination.products &&
    // dataPagination.products.map((item,i)=>{
    //   return(
    //   <tr key={i}>
    //   <th scope="row">{item.id}</th>
    //   <td>{item.name}</td>
    //   <td>{item.price}</td>
    //   <td>{item.stock}</td>
    //   <td>{item.categoryId}</td>
    //   <td>{item.isStatus?"Var":"Yok"}</td>
    //   <td><button onClick={()=>deleteId("products/"+item.id)} className='btn btn-danger'>Delete</button></td>
    //   <td><Link to={`/product-edit/${item.id}`}>Edit</Link></td>
    // </tr>
    //   )
    // })
    
    }
    
    
    
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><button  onClick={()=>decrease()} className="page-link" >Previous</button></li>
    <li className="page-item"><button onClick={()=>increase()} className="page-link" href="#">Next</button></li>
  </ul>
</nav>
<h2>Category</h2>
<Link to={"/kategori-ekle"}>
<button className='btn btn-success'>Kategori Ekle</button>
</Link>
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">IsStatus</th>
      <th scope='col'>Settings</th>
      <th scope='col'>Edit</th>
    </tr>
  </thead>
  <tbody>
    {
      categoryData.map((item,i)=>{
        return(
          <tr key={i}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.isStatus?"Var":"Yok"}</td>
      <td><button onClick={()=>deleteId("category/"+item.id)} className='btn btn-danger'>Delete</button></td>
      <td><Link to={`/kategori-edit/${item.id}`}>Edit</Link></td>
    </tr>
        )
      })
    }
    
  </tbody>
</table>
    </>
  )
}

export default Home