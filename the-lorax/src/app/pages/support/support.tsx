import React from 'react';
import { useState , useEffect} from 'react';
import './support.css';
import "../../components/header.css";
import logo from '../../../images/logo.svg';
import bigTree1 from '../../../images/icons/tree-icon-6-1.svg';
import bigTree2 from '../../../images/icons/tree-icon-8-1.svg';
import Footer from '../../components/footer';

export default function Support() {
    const [isMobile, setIsMobile] = useState(false);
    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial value
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div>
            {isMobile ? (
                <div className="support-page-background">
                    <div className='support-text-container'>
                        <span className='support-text'>Support</span>
                    </div>
                    <div className='support-body'>
                        <div className='support-body-text-container'>
                            <h2 className='support-body-text'>
                                Question?
                            </h2>
                            <div className='support-body-text'>
                                Contact
                                <a href='https://biology.kzoo.edu/faculty-staff/bgirdler/' target='_blank' rel='noopener noreferrer' className='link-text'>
                                    Dr. Binney Girdler
                                </a>
                            </div>
                            <div className='support-body-text'>
                                Professor of Biology, Biology Department at Kalamazoo College
                            </div>
                            <h2 className='support-body-text'>
                                Resources
                            </h2>
                            <div className='support-body-text'>
                                Backend Code at 
                                <a href='https://github.com/cole-koryto/trees-backend' target='_blank' rel='noopener noreferrer' className='link-text'>
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="support-page-background">
                    <div className='logo-container-suppport-page'>
                        <img src={logo} className='logo-icon'/>
                    </div>
                    <div className='support-text-container'>
                        <span className='support-text'>Support</span>
                    </div>
                    <div className='support-body'>
                        <div className='big-tree-container'>
                            <img src={bigTree1} alt='Big Tree 1' className='big-tree-icon'/>
                        </div>
                        <div className='support-body-text-container'>
                            <h2 className='support-body-text'>
                                Question?
                            </h2>
                            <div className='support-body-text'>
                                Contact
                                <a href='https://biology.kzoo.edu/faculty-staff/bgirdler/' target='_blank' rel='noopener noreferrer' className='link-text'>
                                    Dr. Binney Girdler
                                </a>
                            </div>
                            <div className='support-body-text'>
                                Professor of Biology, Biology Department at Kalamazoo College
                            </div>
                            <h2 className='support-body-text'>
                                Resources
                            </h2>
                            <div className='support-body-text'>
                                Backend Code at 
                                <a href='https://github.com/cole-koryto/trees-backend' target='_blank' rel='noopener noreferrer' className='link-text'>
                                    Github
                                </a>
                            </div>
                        </div>
                        <div className='big-tree-container'>
                            <img src={bigTree2} alt='Big Tree 2' className='big-tree-icon'/>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
            
        </div>
    )
}