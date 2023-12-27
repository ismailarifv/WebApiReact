import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import KategoriEkle from './components/KategoriEkle'
import ProductEkle from './components/ProductEkle'
import KategoriEdit from './components/KategoriEdit'
import ProductEdit from './components/ProductEdit'

function App() {
 
  return (
    <>
    <Routes>
                <Route path='/' element={<Home />} />
                <Route path='kategori-ekle' element={<KategoriEkle />} />
                <Route path='product-ekle' element={<ProductEkle />} />
                <Route path='/kategori-edit/:id' element={<KategoriEdit/>} />
                <Route path='/product-edit/:id' element={<ProductEdit/>} />
                
            </Routes>
    </>
  )
}

export default App
