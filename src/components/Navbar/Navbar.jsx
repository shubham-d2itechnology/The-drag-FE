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
dotnenv.config();



const Navbar = () => {
    const [State, setState] = useState(sessionStorage.getItem('State'));
    const [creator, setcreator] = useState(sessionStorage.getItem('creator'));
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
            alert(res.message);
            setState(sessionStorage.getItem('State'));
            window.location.reload();
        })
    }
    return (
        <div className="nav-container">
            <div className="navbar">
                <Link to='/' reloadDocument>
                    <img src={logo} alt="" className="nav-logo" />
                    <p>Drag</p>
                </Link>
                
                <div className="nav-icons-list">
                    {(State === 'login') ? (creator === 'true') ? <Popup  trigger={<button type="button" style={{ cursor: 'pointer', fontFamily: 'Jost', borderRadius: '10px', backgroundColor: 'white', color: '#1c1826', fontWeight: '700', outline: 'none', border: 'none', }}>Update Creator Id</button>} closeOnDocumentClick={false} modal>
                        {
                            close => (
                                <Update close={close} />

                            )
                        }
                    </Popup> :(creator==='false')? <Popup trigger={<button type="button" style={{ cursor: 'pointer', fontFamily: 'Jost', borderRadius: '10px', backgroundColor: 'white', color: '#1c1826', fontWeight: '700', outline: 'none', border: 'none', }}>Register as Creator</button>} closeOnDocumentClick={false} modal nested>
                        {
                            close => (
                                <Register close={close} location={location} />
                            )
                        }
                    </Popup> : 
                    <button type="button" style={{ cursor: 'pointer', fontFamily: 'Jost', borderRadius: '10px', backgroundColor: 'white', color: '#1c1826', fontWeight: '700', outline: 'none', border: 'none', }}>Waiting for Approval</button>
                    :<></>}
                    {
                        (State !== 'login') ?
                            <Popup className="login-popup" trigger={<button type="button" style={{ cursor: 'pointer', fontFamily: 'Jost', borderRadius: '10px', backgroundColor: 'white', color: '#1c1826', fontWeight: '700', outline: 'none', border: 'none', }}>Sign Up/ Login</button>} modal>
                                {
                                    close => (
                                        <Login setResponse={fetchdata} />
                                    )
                                }
                            </Popup>
                            : <button type="button" onClick={logout} style={{ cursor: 'pointer', fontFamily: 'Jost', borderRadius: '10px', backgroundColor: 'white', color: '#1c1826', fontWeight: '700', outline: 'none', border: 'none', }}>Log Out</button>
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
        </div>
    )
}
export default Navbar;
