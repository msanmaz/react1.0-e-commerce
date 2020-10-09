import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {signOutUserStart} from './../../redux/User/user.actions'
import { Button } from './../Button';

import './navbar.css';

import Logo from './../../assets/logo.png';
const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = props => {
   
    const dispatch = useDispatch()
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [button, setButton] = useState(true);


    const signOut= () => {
        dispatch(signOutUserStart())  
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    const { currentUser } = useSelector(mapState);
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo'>
                    <img src={Logo} alt='simplelogo' className='logo' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                {currentUser && (
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                                My Account
                    </Link>
                        </li>
                        <li className='nav-item nav-links'>
                            <span onClick={() => signOut()}>LogOut</span>

                        </li>

                    </ul>
                )}


                {!currentUser && (
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                    </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                                Products
                    </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                Log In
                    </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/registration' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                    </Link>
                        </li>
                        <li className='nav-item'>
                            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                        </li>
                    </ul>
                )}


            </div>

        </nav>

    )
}


Header.defaultProps = {
    currentUser: null
}


export default Header;
