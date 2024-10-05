import React, { useState } from 'react'
import './Dropdown.css'
import { Link } from 'react-router-dom';
const Dropdown = ({entries,input=null,category,setinput=null,Input=null,func=null}) => {
  console.log(entries);
  



  
  return (

    <div className='dropdown' onMouseEnter={(e)=>func(true)} onMouseLeave={(e)=>func(false)} >
      {
   (category==="location")?
      <ul>
        {
         entries.map((ele, i) => {


            return (
              <li key={i} onClick={()=>{
                input(ele);
              }}>


                {
                  ele
                }



              </li>

            )
          })
        }
      </ul>
      :
      <ul>
        {
          entries.map((item,idx)=>{
              return (<li key={idx} onClick={(e)=>{
               
                document.getElementById(idx).checked=!document.getElementById(idx).checked;
                if(document.getElementById(idx).checked){
                  setinput(item,true);
                  }
                  else{
                    setinput(item,false);
                  }
                
                
              }}><input type="radio" name={item} id={idx} checked={(Input.includes(item))?true:false}    />{" "+item}</li>
            )
          })
        }
      </ul>
}
    </div>
  )
}

export default Dropdown
