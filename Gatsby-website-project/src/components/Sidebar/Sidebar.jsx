import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-scroll';

export default props => {
  return (
    <Menu>
        <Link to="hero" className="menu-item" smooth duration={1000}>
            HOME
        </Link>
        <Link to="facts" id="zoneLink" className="menu-item" smooth duration={1000}>
            INVESTMENT INFORMATION ABOUT HUNGARY
        </Link>
        <Link to="features" className="menu-item" smooth duration={1000}>
            FURTHER INFORMATION ABOUT THE INDUSTRIAL SITE
        </Link>
        <Link to="video" className="menu-item" smooth duration={1000}>
            VIDEO PRESENTATION
        </Link>
        <Link to="ideal" className="menu-item" smooth duration={1000}>
            THE INDUSTRIAL SITE IS IDEAL FOR
        </Link>
        <Link to="partner" className="menu-item" smooth duration={1000}>
            YOUR LOCAL INVESTMENT PARTNER
        </Link>
        <Link to="companies" className="menu-item" smooth duration={1000}>
            GLOBAL COMPANIES THAT PREVIOUSLY CHOSE HUNGARY
        </Link>
        <Link to="invest" className="menu-item" smooth duration={1000}>
            SUMMARY OF INVESTMENT OPPORTUNITIES AND THE ECONOMIC ENVIRONMENT IN HUNGARY
        </Link>
        <Link to="gallery" className="menu-item" smooth duration={1000}>
            HUNGARY IN PICTURES
        </Link>
        <Link to="contact" className="menu-item" smooth duration={1000}>
            CONTACT
        </Link>
    </Menu>
  );
};
