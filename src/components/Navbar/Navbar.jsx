import React, { useEffect, useState } from "react";
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import profile_icon from '../../assets/profile_icon.svg'
import cart_icon from '../../assets/cart_icon.svg'
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Register from "../Register/Register";
import Login from "../login/Login";
import Update from "../Update/Update";
import dotnenv from 'dotenv'
import DealCreate from "../DealCreate/DealCreate";
dotnenv.config();



const Navbar = () => {
    const [State, setState] = useState(sessionStorage.getItem('State'));
    const [creator, setcreator] = useState(sessionStorage.getItem('creator'));
    const [path,setPath]=useState(window.location.pathname);
    const [location, setlocation] = useState(new Map());

    console.log(State);
    console.log(creator);
    useEffect(() => {
        const Fetch = async () => {
            var mp = new Map();
            await fetch('https://countriesnow.space/api/v0.1/countries')
                .then((res) => res.json())
                .then((res) => {

                    res.data.map((ele) => (
                        mp.set(ele.country, ele.cities)
                    )

                    )
                    setlocation(mp);
                })
        }
        Fetch();
    }, [])
    const fetchdata = (data, st) => {
        console.log(data);
        setcreator(data);
        setState(st);

    }


    const logout = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/logout`,
            {
                method: 'post',
                credentials: 'include'


            }
        ).then((res) => res.json()).then((res) => {
            console.log(res.message);
            sessionStorage.setItem('State', 'logout');
            sessionStorage.removeItem('creator');
            sessionStorage.removeItem('email');
            alert(res.message);
            setState(sessionStorage.getItem('State'));
            window.location.reload();
        })
    }
 
     useEffect(()=>{
        if(path=='/creators'||path=='/'){
        document.getElementsByClassName('second')[0].classList.remove('selected');
        document.getElementsByClassName('first')[0].classList.remove('selected');
        document.getElementsByClassName('first')[0].classList.add('selected');
     }

     if(path=='/deals'){
        document.getElementsByClassName('second')[0].classList.remove('selected');
        document.getElementsByClassName('first')[0].classList.remove('selected');
        document.getElementsByClassName('second')[0].classList.add('selected');
     }
     console.log(window.location.pathname);
    
    
    }
     ,
     [path])
   


    return (
        <div className="nav-container">
            <div className="navbar">
                <Link to='/' reloadDocument>
                    <img src={logo} alt="" className="nav-logo" />
                    <p>Drag</p>
                </Link>
            
                <div className="nav-icons-list">
                    {(State === 'login') ? (creator === 'true') ? <Popup  trigger={<button type="button" className='nav-btn' >Update Creator Id</button>} closeOnDocumentClick={false} modal>
                        {
                            close => (
                                <Update close={close} />

                            )
                        }
                    </Popup> :(creator==='false')? <Popup trigger={<button type="button" className='nav-btn' >Register as Creator</button>} closeOnDocumentClick={false} modal nested>
                        {
                            close => (
                                <Register close={close} location={location} />
                            )
                        }
                    </Popup> : 
                    <button type="button" className='nav-btn' >Waiting for Approval</button>
                    :<></>}
                    {
                        (State !== 'login') ?
                            <Popup className="login-popup" trigger={<button type="button" className='nav-btn' >Sign Up/ Login</button>} modal>
                                {
                                    close => (
                                        <Login setResponse={fetchdata} />
                                    )
                                }
                            </Popup>
                            : <button type="button" className='nav-btn' onClick={logout} >Log Out</button>
                    }
                    {/* <div className="nav-icon">
           <Link to='#'> <img src={search_icon} alt=""  /></Link> 
         </div>
         <div className="nav-icon">
           <Link to='#'><img src={profile_icon} alt=""  /></Link> 
         </div>
         <div className="nav-icon">
            <Link to='#'><img src={cart_icon} alt=""  /></Link>
         </div> */}
                </div>
            </div>
            <div className="creator-deals">
            <table>
        <thead>
         
          <td className="first "
                onClick={(e)=>setPath('/creators')}  >
             <Link to='/creators' id="f"><h3>Creators</h3></Link>
          </td>
          
          
          <td 
          className="second"
          onClick={(e)=>setPath('/deals')}
          >
            <Link to='/deals' id="s"><h3>Deals</h3> </Link>
            </td>
         
          
        </thead>
        </table>
            </div>
        </div>
    )
}
export default Navbar;
