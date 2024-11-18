import React from 'react';
import './adminMobile.css';
import sadTree from '../../../images/icons/sad-tree.svg';

export default function AdminMobile() {
    
    return (
        <div className='admin-phone'>
            <div className='admin-phone-text-container'>
                <span className='admin-phone-text'>Admin</span>
                <span className='admin-phone-body-text'>Sorry...You can only access the Admin Page on Desktop</span>
            </div>
            <div className='sad-tree-container'>
                <img src={sadTree} alt='Sad Tree' className='sad-tree-icon' />
            </div>
        </div>
    )
}