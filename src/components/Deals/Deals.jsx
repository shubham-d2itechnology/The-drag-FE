import React, { useEffect, useState } from 'react'
import './Deals.css'
import Deal_card from '../Deal-Card/Deal-card';
import DealCreate from '../DealCreate/DealCreate';
import Popup from 'reactjs-popup';

const Deals =  () => {
   const [deals,setDeals]=useState(null);
    useEffect( ()=>{
         fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/deals`).then((res)=>res.json()).then((res)=>{console.log(res.data);
          setDeals(res.data)});
    },[]) 



  return (
    <div className='deals-container'>
       <div className="post">
       <Popup contentStyle={{marginBottom:'5vh'}} trigger={<button className='post-btn'><p>Post a Deal</p></button>} modal nested closeOnDocumentClick={true}>
              <DealCreate />
            </Popup>
       </div>
        {(deals)?
        <div className='deals-main'>
        {
          deals.map((item,idx)=>{
            return <Deal_card key={idx} prop={item}/>
          })
        }
           
            


        </div>:
        <div>
            <h2>Loading Deals...</h2>
        </div>
}
      
      
      
      
    </div>
  )
}

export default Deals;
