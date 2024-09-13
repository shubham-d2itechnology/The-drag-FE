import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import  DragContext  from './Context/Dragcontext.js';
import brands from './assets/brands.js';
import creators from './assets/creators.js';
import communities from './assets/communities.js'
import dotenv from 'dotenv'
dotenv.config()




const root = ReactDOM.createRoot(document.getElementById('root'));
var creatordata;
var location=new Map();
console.log(process.env.REACT_APP_BASE_URL);


fetch('https://countriesnow.space/api/v0.1/countries').then((res)=>res.json()).then((res)=>{
  res.data.map((ele)=>{
    location.set(ele.country,ele.cities);
  })
  console.log(location);
  fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/`).then((res)=>res.json()).then((res)=>{creatordata=res.data;localStorage.setItem('State','logout');root.render(
   
    <React.StrictMode>
      <DragContext.Provider value={{brands,creators,communities,creatordata,location}} >
      
       <App />
      </DragContext.Provider>
     
    </React.StrictMode>
  );
  });
})
 

