import React from 'react'
import './Deal-card.css'
import Popup from 'reactjs-popup'
import Contact from '../Contact/Contact'
import DealDetails from '../DealDetails/DealDetails'
import dotenv from 'dotenv'
dotenv.config();

const Deal_card = ({prop}) => {
    const {followers, socialMedia}=prop;
    console.log(prop._id);
    let fl= String(followers);
    let cnt=0;
    for(let i=fl.length-1;i>0;i--){
       cnt++;
       
       if(cnt%3==0){
      fl=fl.substr(0,fl.length-cnt)+","+fl.substr(i);
      console.log(fl);
       }
    }

   const handleDelete=async (e)=>{
      await fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/deals`,{
        method:"DELETE",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({
           email:prop.email,
           id:prop._id
        }),
        credentials:'include'
      }).then((res)=>res.json())
      .then((res)=>{
        alert(res.message);
         window.location.reload();
      })
   }

  return (
    <div className='deal_card-container'>

     <table   >
     
     <tbody>
      <td className='head' ><h3>Company Name</h3></td>
      <td>:</td>
      <td className='desc'><a href={socialMedia} target="_blank"><p> {prop.companyName} <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg></p></a></td>
     </tbody>
     
     <tbody>
      <td className='head'><h3>Creator Type</h3></td>
      <td>:</td>
      <td className='desc' id="creator-type"><p> {prop.creatorType}</p></td>
     </tbody>
     <tbody>
      <td className='head'><h3>Minimum Followers</h3></td>
      <td>:</td>
      <td className='desc'><p> {fl}</p></td>
     </tbody>
     
     </table>
       <div className="controls">

      {
       (prop.email===sessionStorage.getItem('email'))?<button className='apply-btn' id="delete" onClick={(e)=>{handleDelete(e);}}>Delete</button>:<></>
      } 
       <Popup trigger={<button className='apply-btn'>Details</button>} modal nested >
      {
        close=>{
          return <DealDetails fl={fl} props={prop}/>
        }
      }
     
      </Popup> 
       </div>
     
    </div>
  )
}

export default Deal_card;
