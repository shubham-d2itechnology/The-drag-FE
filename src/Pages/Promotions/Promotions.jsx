import React, { useContext, useState } from 'react'
import image from '../../assets/image.png'
import './Promotions.css'
import filter from '../../assets/filter.svg'
import CreatorCard from '../../components/CreatorCard/CreatorCard'
import Popup from 'reactjs-popup'
import Filter from '../../components/Filter/Filter'
import DragContext from '../../Context/Dragcontext'
import dotenv from 'dotenv'
dotenv.config();

const Promotions = () => {
  let { creatordata } = useContext(DragContext);
  const [data, setdata] = useState(creatordata);
  const [search, setsearch] = useState("");
  const [Count, setCount] = useState(6);
  const [isFilter,setisFilter]=useState(false);

  const fetchdata = (res) => {
    setisFilter(true);
    setdata(res);

  }
  const handlesearch = async (e) => {

  setisFilter(false);
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ search: e.target.value })

    }).then((res) => res.json()).then(res => {
      console.log(res.data);
      setdata(res.data);
      console.log(search);

    })

  }
  let size = 0;


  return (
    <div className='promotions-container'>
      <div className="search-filter">
        <div className="search">
          <form  onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="search" ><svg width="18" height="18" viewBox="0 0 24 24" fill="blue" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.1333 24L13.7333 15.6C13.0667 16.1333 12.3 16.5556 11.4333 16.8667C10.5667 17.1778 9.64444 17.3333 8.66667 17.3333C6.24444 17.3333 4.19444 16.4944 2.51667 14.8167C0.838889 13.1389 0 11.0889 0 8.66667C0 6.24444 0.838889 4.19444 2.51667 2.51667C4.19444 0.838889 6.24444 0 8.66667 0C11.0889 0 13.1389 0.838889 14.8167 2.51667C16.4944 4.19444 17.3333 6.24444 17.3333 8.66667C17.3333 9.64444 17.1778 10.5667 16.8667 11.4333C16.5556 12.3 16.1333 13.0667 15.6 13.7333L24 22.1333L22.1333 24ZM8.66667 14.6667C10.3333 14.6667 11.75 14.0833 12.9167 12.9167C14.0833 11.75 14.6667 10.3333 14.6667 8.66667C14.6667 7 14.0833 5.58333 12.9167 4.41667C11.75 3.25 10.3333 2.66667 8.66667 2.66667C7 2.66667 5.58333 3.25 4.41667 4.41667C3.25 5.58333 2.66667 7 2.66667 8.66667C2.66667 10.3333 3.25 11.75 4.41667 12.9167C5.58333 14.0833 7 14.6667 8.66667 14.6667Z" fill="rgba(64, 1, 1, 1)
"/>

            </svg></label>
            <input type="text" name="search" id="search" placeholder='Search...' onInput={(e) => {
              setsearch(e.target.value);
              handlesearch(e);
            }} />
          </form>
        </div>
        <Popup trigger={<div className="filter">
          <img src={filter} alt="filter" style={{ width: '18px', height: '18px' }} />
          <p>Filter</p>
        </div>} modal>
          {
            close => (<Filter helper={fetchdata} close={close} />)
          }

        </Popup>

      </div>
      <div className="creators">
        <h2 >Creators </h2>
        {console.log(data)
        }
        <div className="creator-list">
          {
 
            (data.length > 0 ) ? (search.length > 0) ?

              data.map((item, idx) => {
                if (size == 0) size = data.length;
                if (idx + 1 <= Count) {
                  const obj = {
                    name: item.userName,
                    email: item.email,
                    image: item.image,
                    linkedinurl: item.socialMedia.linkedin.url,
                    linkedincount: item.socialMedia.linkedin.count,
                    instaurl: item.socialMedia.insta.url,
                    instacount: item.socialMedia.insta.count,
                    twitterurl: item.socialMedia.twitter.url,
                    twittercount: item.socialMedia.twitter.count,
                    facebookurl: item.socialMedia.facebook.url,
                    facebookcount: item.socialMedia.facebook?.count,
                    youtubeurl: item.socialMedia.youtube.url,
                    youtubecount: item.socialMedia.youtube.count,
                  }
                  return <CreatorCard props={obj} />
                }
                else return <></>
              }) :(isFilter)?(data.length>0)?
              data.map((item, idx) => {
                if (size == 0) size = data.length;
                if (idx + 1 <= Count) {
                  const obj = {
                    name: item.userName,
                    email: item.email,
                    image: item.image,
                    linkedinurl: item.socialMedia.linkedin.url,
                    linkedincount: item.socialMedia.linkedin.count,
                    instaurl: item.socialMedia.insta.url,
                    instacount: item.socialMedia.insta.count,
                    twitterurl: item.socialMedia.twitter.url,
                    twittercount: item.socialMedia.twitter.count,
                    facebookurl: item.socialMedia.facebook.url,
                    facebookcount: item.socialMedia.facebook?.count,
                    youtubeurl: item.socialMedia.youtube.url,
                    youtubecount: item.socialMedia.youtube.count,
                  }
                  return <CreatorCard props={obj} />
                }
                else return <></>
              }):
              (<div >
                <p style={{ color: 'white', fontSize: '40px', fontFamily: 'Roboto', fontWeight: '500' }}>No Creator Matches Your applied Filter</p>
              </div>) :
              creatordata.map((item, idx) => {
                if (size == 0) size = creatordata.length;
                if (idx + 1 <= Count) {
                  const obj = {
                    name: item.userName,
                    email: item.email,
                    image: item.image,
                    linkedinurl: item.socialMedia.linkedin.url,
                    linkedincount: item.socialMedia.linkedin.count,
                    instaurl: item.socialMedia.insta.url,
                    instacount: item.socialMedia.insta.count,
                    twitterurl: item.socialMedia.twitter.url,
                    twittercount: item.socialMedia.twitter.count,
                    facebookurl: item.socialMedia.facebook.url,
                    facebookcount: item.socialMedia.facebook?.count,
                    youtubeurl: item.socialMedia.youtube.url,
                    youtubecount: item.socialMedia.youtube.count,
                  }
                  return <CreatorCard props={obj} />
                }
                else return <> </>
              }) : (search.length>0) ?
              (<div >
                <p style={{ color: 'white', fontSize: '40px', fontFamily: 'Roboto', fontWeight: '500',textAlign:'center' }}>No Creator Matches Your Search</p>
              </div>) :(isFilter)?
              (<div >
                <p style={{ color: 'white', fontSize: '40px', fontFamily: 'Roboto', fontWeight: '500',textAlign:'center' }}>No Creator Matches Your applied Filter</p>
              </div>):creatordata.map((item, idx) => {
                if (size == 0) size = data.length;
                if (idx + 1 <= Count) {
                  const obj = {
                    name: item.userName,
                    email: item.email,
                    image: item.image,
                    linkedinurl: item.socialMedia.linkedin.url,
                    linkedincount: item.socialMedia.linkedin.count,
                    instaurl: item.socialMedia.insta.url,
                    instacount: item.socialMedia.insta.count,
                    twitterurl: item.socialMedia.twitter.url,
                    twittercount: item.socialMedia.twitter.count,
                    facebookurl: item.socialMedia.facebook.url,
                    facebookcount: item.socialMedia.facebook?.count,
                    youtubeurl: item.socialMedia.youtube.url,
                    youtubecount: item.socialMedia.youtube.count,
                  }
                  return <CreatorCard props={obj} />
                }
                else return <></>
              })
          }

        </div>
        {
          (size > Count) ?
            <button className='more' onClick={(e) => {
              setCount(Count + Count);
            }}>
              Load More ...
            </button> : <></>

        }
      </div>


    </div>
  )
}

export default Promotions
