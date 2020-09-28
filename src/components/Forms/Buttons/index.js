import React from 'react';
import './buttons.css';


const Buttons = ({children, ...otherProps}) => {
    return(
        <button className='btnG' {...otherProps}>
            {children}
        </button>
    )
}

export default Buttons