import React from 'react';
import "./footer.css";
import kLogo from '../../images/K-Color-1.png';
import kLogoStackLeft from '../../images/K-Stack-Left-Color.png'

export default function Footer() {
    return (
        <div className='footer'>
            <img src={kLogoStackLeft} alt='K Logo Stack Left' className='stack-left-container'/>
            <div className='footer-text-container'>
                <div className='footer-text'>
                    The Kampus Tree Project
                </div>
                <div className='footer-text'>
                    Project of COMP 484/490: Computing for the Environment and Social Justice
                </div>
            </div>
        </div>
    )
}
