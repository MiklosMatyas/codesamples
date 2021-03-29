import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';

const Features = () => {
  const { features } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree, resume } = features;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);


  return (
    <section id="features">
      <Container>
        <Title title="Features of the Abasár" titleSub="INVESTMENT SITE" />
          <Reveal effect="fadeInUp" effectOut="fadeOutLeft">
            <p>Markup that will be revealed on scroll</p>
          </Reveal>
        <Row className="about-wrapper">
          <Col md={4} sm={12}>

            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px" effectOut="fadeOutLeft">
              <div className="about-wrapper__info blue-line">
                <p className="about-wrapper__info-text">
                  { 'Located in a beautiful and quality area at the foot of the Mátra mountains, the site has good infrastructure and all public utilities.' }
                </p>
              </div>
            </Fade>
          </Col>
          <Col md={4} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line pl-5">
                <p className="about-wrapper__info-text">
                  AREA: <br /> <span className="big-1">80 HECTARES</span><br /> (800,000 m2, 198 acres
                </p>
              </div>
            </Fade>
          </Col>
          <Col md={4} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line pl-5">
                <p className="about-wrapper__info-text">
                  { 'The Abasár local council is supportive of all serious and largescale investments in the region.' }
                </p>
              </div>
            </Fade>
          </Col>
        </Row>        
        <Row className="about-wrapper">
          <Col md={5} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <h3>LOT COVERAGE</h3>
                <p className="about-wrapper__info-text">
                  { 'up to 30%, with a further 40% for parking, loading purposes and internal roads. Minimum of 30% for green spaces.' }
                </p>
              </div>
            </Fade>
          </Col>
          <Col md={7} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <h3>SOIL</h3>
                <p className="about-wrapper__info-text">
                  { 'rocky ground with good geomechanical properties and high load-bearing capacity. The topsoil has already been stripped, and it only requires landscaping and the setting of the final heights for the planned building(s).' }
                </p>
              </div>
            </Fade>
          </Col>
        </Row>        
        <Row className="about-wrapper w-80">
          <Col md={12} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <h3>INFRASTRUCTURE</h3>  
                <ul className="about-wrapper__info-text">
                    <li>
                        Close to the M3 motorway (about 10 kilometres, roughly 6 miles), 
                    </li>
                    <li>
                        Close to Hungary’s high-speed East-West railway line, 
                    </li>
                    <li>
                        You can access the site directly from road 2416, which also leads to the region’s biggest towns (Gyöngyös and Eger), route 3 and the M3 motorway.
                    </li>
                </ul>
              </div>
            </Fade>
          </Col>
        </Row>        
        <Row className="about-wrapper">
          <Col md={5} sm={12} className="pr-5">
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <p className="about-wrapper__info-text">
                  { 'Hungary’s largest power plant, the Mátra Power Plant, is 10 km away, providing 800 MW of electricity from its 5 units.' }
                </p>
              </div>
            </Fade>
          </Col>
          <Col md={7} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <p className="about-wrapper__info-text">
                  { 'Utilities, such as mains water, sewage, gas and high-speed internet (wireless 5G from 2021) are all available. Due to its vicinity to the Mátra Power Plant, the site is also a NATOprotected zone.' }
                </p>
              </div>
            </Fade>
          </Col>
        </Row>        
        <Row className="about-wrapper w-80">
          <Col md={12} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <p className="about-wrapper__info-text">
                  { 'There are 4 towns in the region: Gyöngyös and Eger (which is also the seat of Heves county), Verpelét and Heves are all close by, which means skilled human resources are available along with candidates with higher education degrees suitable for management positions.' }
                </p>
              </div>
            </Fade>
          </Col>
        </Row>        
        <Row className="about-wrapper">
          <Col md={12} sm={12}>
            <Fade bottom={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info blue-line">
                <div className="about-wrapper__image">
                  <AboutImg alt="profile picture" filename={img} />
                </div>
              </div>
            </Fade>
          </Col>
        </Row>        

      </Container>
    </section>
  );
};

export default Features;
