import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Button } from './../Button';
import { auth } from './../../firebase/utils';

import './navbar.css';

import Logo from './../../assets/logo.png';


const Header = props => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [button, setButton] = useState(true);

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

    const { currentUser } = props;
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
                        <li className='nav-item nav-links'>
                            <span onClick={() => auth.signOut()}>LogOut</span>

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

const mapStateToProps = ({user}) =>({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(Header);
