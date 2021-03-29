import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';
import MabLogo from "../svgs/mab-logo.svg";

import { githubButtons } from '../../mock/data';

const Footer = () => {
  const { footer } = useContext(PortfolioContext);
  const { networks } = footer;
  const { isEnabled } = githubButtons;

  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <div className="footer-logo">
          <MabLogo />
        </div>
        <div className="footer-contact">
          <div><strong>mab group of companies</strong></div>
          <div>T. +36 1 700 4900</div>
          <div>Reg. Nr. 13-10-040945</div>
          <div>47° 26’ 45.2” N</div>
          <div>info@mab.co.hu</div>
          <div>H-2045 Törökbálint, Torbágy u. 20</div>
          <div>F. +36 1 700 4999</div>
          <div>EU VAT Nr. HU 14063206</div>
          <div>18° 52’ 43.6” E</div>
          <div>www.mab.co.hu</div>
        </div>
        <p className="footer__text">
          ©All rights reserved<br />
          The information contained in this document may be CONFIDENTIAL and is for the intended addressee only. Any unauthorized use, dissemination of the information, or copying of this documentum is prohibited. If you are not the intended addressee, please notify the sender immediately.
        </p>

        <span className="back-to-top">
          <Link to="hero" smooth duration={1000}>
            <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
          </Link>
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
