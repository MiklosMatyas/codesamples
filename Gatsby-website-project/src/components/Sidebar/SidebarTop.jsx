import React, { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-scroll';

export default props => {

    useEffect(() => {
        document.addEventListener('scroll', event => handleScroll(event))
    });
    
    const handleScroll  = (event) => {
        setTimeout(() => {
            if(document.querySelector("html").scrollTop < 300){
                document.querySelector("#zoneLink").click();
            }
        }, 2000);
    }
    
    handleScroll();

  return (
    <Menu>
        <div className="item">
            <Link to="hero" className="menu-item" smooth duration={0}>
                HOME
            </Link>
        </div>
        <div className="item">
            <Link to="about" className="menu-item" smooth duration={0}>
                THE ZONE
            </Link>
        </div>
        <div className="item">
            <Link to="facts" className="menu-item" smooth duration={0}>
                ABOUT HUNGARY
            </Link>
        </div>
        <div className="item">
            <Link to="features" className="menu-item" smooth duration={0}>
                THE INDUSTRIAL SITE
            </Link>
        </div>
        <div className="item">
            <Link to="ideal" className="menu-item" smooth duration={0}>
                INDUSTRIES
            </Link>
        </div>
        <div className="item">
            <Link to="partner" className="menu-item" smooth duration={0}>
                YOUR PARTNER
            </Link>
        </div>
        <div className="item">
            <Link to="contact" className="menu-item" smooth duration={0}>
                CONTACT
            </Link>
        </div>
    </Menu>
  );
};
