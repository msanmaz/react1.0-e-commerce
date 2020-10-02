import React from 'react';
import './authwrap.css';


const AuthWrapper = ({headline, children}) => {
    return(
        <div className='authwrapper'>
            <div className='authwrap'>
              {headline && <h2>{headline}</h2>}
            </div>
            <div className='children'>
                {children && children}
            </div>
        </div>
    )
}

export default AuthWrapper;