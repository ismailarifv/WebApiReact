
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import DataProvider from './context/DataProvider.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </DataProvider>
)
