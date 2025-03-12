import React from 'react';
import './Navbar.css'
import menu_logo from '../../assets/menu.png'
import logo from '../../assets/logo.jpg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom';

const Navbar = ({setSidebar}) => {
    return (
        <nav className='flex-div'>
            <div className='flex-div nav-left'>
                <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_logo}></img>
                <Link to='/'><img className='logo' src={logo}></img></Link>
            </div>
            <div className='flex-div nav-middle'>
                <div className='search-box flex-div'>
                    <input type='text' placeholder='Search'></input>
                    <img src={search_icon}></img>
                </div>
            </div>
            <div className='nav-right flex-div'>
                <img src={upload_icon}></img>
                <img src={more_icon}></img>
                <img src={notification_icon}></img>
                <img className='user-icon' src={profile_icon}></img>
            </div>
        </nav>
    );
};

export default Navbar;