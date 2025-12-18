import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/HomePage';
import {BrowserRouter , Route,Routes} from "react-router-dom"
import GoutsList from './components/GoutsList';
import IntesityLevel from './components/IntesityLevel';
import Succes from './components/Succes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/App' element={<App/>}/>
        <Route path='/gouts' element={<GoutsList/>}/>
        <Route path='/IntesityLevels' element={<IntesityLevel/>}/>
        <Route path='/SuccesDeguster' element={<Succes/>}/>
      
    </Routes>

    </BrowserRouter>
   
   
    </>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
