import React,{useState} from 'react'
import "./CSS/NavBar.css"
import { AiOutlineLogin } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, } from 'antd';
import { useNavigate } from 'react-router';

function NavBar(props) {
    const local = localStorage.getItem('username')
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        navigate('/Profile')
    };
  
    const items = [
        {
            label: 'Profile',
            key: '1',
            icon: <UserOutlined />,
        }
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    return (
        <nav>
            <a href="index.html">
                <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg>
            </a>
            <div>
                <ul id='navbar'>
                    <li><a className='active' href="/">Home</a></li>
                    <li><a href="/Movies">Movies</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </div>
            <div className='logreg'>
            {props.isLoggedIn ? (
         
          <><li><a href="/Login"> <AiOutlineLogin />Login</a></li><li><a href="/Register"><FaUserCircle />Register</a></li></>



 ) : (
           
            <><Space wrap>
                            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                               <a href="/Profile">{local}</a> 
                            </Dropdown.Button>
                        </Space><li><a href="/Logout"><FaUserCircle />LogOut</a></li></>
          
                   )}
            
            </div>
        </nav>
    )
}

export default NavBar