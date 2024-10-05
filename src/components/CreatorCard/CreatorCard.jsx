import React from 'react'
import './CreatorCard.css'
import image from '../../assets/deekshapandey.jpeg'
import images from '../../assets/images'
import Popup from 'reactjs-popup';
import Contact from '../Contact/Contact';
import dotenv from 'dotenv'
dotenv.config();

const {linkedin,youtube,twitter,insta,facebook}=images;
const CreatorCard = ({props}) => {
  const {name,image,email,instaurl,instacount,twitterurl,twittercount,facebookurl,facebookcount,youtubeurl,youtubecount,linkedinurl,linkedincount}=props;
  console.log(instacount);
  const totalsum=instacount+twittercount+linkedincount+facebookcount+youtubecount;
  const totalk=Math.floor(totalsum/1000);
  let totalM,instaM,linkedinM,twitterM,facebookM,youtubeM;
  if(totalk>=1000){
    totalM=Math.floor(totalk/1000);
  }
  const instak=Math.floor(instacount/1000);
  if(instak>=1000){
    instaM=Math.floor(instak/1000);
  }
  const linkedink=Math.floor(linkedincount/1000);
  if(linkedink>=1000){
    linkedinM=Math.floor(linkedink/1000);
  }
  const twitterk=Math.floor(twittercount/1000);
  if(twitterk>=1000){
    twitterM=Math.floor(twitterk/1000);
  }
  const facebookk=Math.floor(facebookcount/1000);
  if(facebookk>=1000){
    facebookM=Math.floor(facebookk/1000);
  }
  const youtubek=Math.floor(youtubecount/1000);
  if(youtubek>=1000){
    youtubeM=Math.floor(youtubek/1000);
  }

  return (
    <div className='creator-card-container'>
        <div className="creator-card-left">
        <div className="box-upper"></div>
        <div className="box-lower"></div>
        <img src={image} alt="" />
        </div>
        <div className="creator-card-right">
         <div className="creator-name">
            <h3>{name}</h3>
            <p>Total Followers {(totalM)?`${totalM}M`:(totalk)?`${totalk}k`:totalsum}</p>
         </div>
         <div className="followers">
            <ul>
                {(linkedinurl!='')?<li>
                   <a href={linkedinurl} target='_blank'><img src={linkedin} alt="" /></a> 
                    <p>{(linkedinM)?`${linkedinM}M`:(linkedink)?`${linkedink}k`:linkedincount} Followers</p>
                </li>:<></>
}
                {(instaurl!='')?<li>
                <a href={instaurl} target='_blank'><img src={insta} alt="" /></a>
                <p>{(instaM)?`${instaM}M`:(instak)?`${instak}k`:instacount} Followers</p>
                </li>:<></>
}
                {(youtubeurl!='')?<li>
                <a href={youtubeurl} target='_blank'><img src={youtube} alt="" /></a>
              <p>{(youtubeM)?`${youtubeM}M`:(youtubek)?`${youtubek}k`:youtubecount} Followers</p>
                </li>:<></>
                }
                {(twitterurl!='')?<li>
                <a href={twitterurl} target='_blank'><img src={twitter} alt="" /></a>
                <p>{(twitterM)?`${twitterM}M`:(twitterk)?`${twitterk}k`:twittercount} Followers</p>
                </li>:<></>
                }
                {(facebookurl!='')?<li id='facebook'>
                <a href={facebookurl} target='_blank'><img src={facebook} alt="" /></a>
              <p>{(facebookM)?`${facebookM}M`:(facebookk)?`${facebookk}k`:facebookcount} Followers</p>
                </li>:<></>
                }
               
            </ul>
           
         </div>
         {(sessionStorage.getItem('State')=='logout')?<button type="button" className='contact-btn' onClick={()=>alert("Please Login First!")}>Contact</button>:
         <Popup  trigger={<button type="button" className='contact-btn'>Contact</button>} modal  position={['top left', 'top right', 'bottom right' ,'bottom left' ,'right center', 'left center', 'top center' ,'bottom center' ,'center center']}>
          {close=>{
            return <Contact email={email} name={name} close={close}/>
          }
          }
         </Popup>
         }
         
         
        </div>
      
    </div>
  )
}

export default CreatorCard
