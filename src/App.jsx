import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Promotions from './Pages/Promotions/Promotions.jsx';
import Deals from './components/Deals/Deals.jsx';
function App() {
  return (
    <div className='container'>
        
     <BrowserRouter>
       <Navbar/>
       
       <Routes>
        <Route path='/' element={<Promotions/>}></Route>
        <Route path='/creators' element={<Promotions/>}></Route>
        <Route path='/deals' element={<Deals/>}></Route>
       </Routes>
       <Footer />
     </BrowserRouter>
   
    </div>
    
   
     

  );
}

export default App;
