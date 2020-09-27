import React from 'react';
import Manshop from './../../assets/manshop.jpg';
import Womanshop from './../../assets/womanshop.jpg';
import './styles.css';


const Directory = props => {
    return (
        <div className='directory'>
            <div className='wrap'>
                <div className='item' style={{
                    backgroundImage: `url(${Womanshop})`
                }}>
                    <button className='myBtn hvr-sweep-to-right'>Shop Womens</button>

                </div>

                <div className='item' style={{
                    backgroundImage: `url(${Manshop})`
                }}>
                    <button className='myBtn hvr-sweep-to-right'>Shop Mens</button>

                </div>

            </div>
        </div>
    )
}

export default Directory;