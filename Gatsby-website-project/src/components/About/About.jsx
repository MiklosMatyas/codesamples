import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';


const About = () => {
  const { about } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree, resume } = about;

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
    <section id="about">
      <Container>
        <Title title="ABASÁR" titleSub="INDUSTRIAL ZONE" />
        <Row className="about-wrapper">
          <Col md={12} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info">
                <h3 className="subtitle">A large and integrated area in the ideal location for your industrial and/or logistics investment: Hungary, the heart of Europe.</h3>
                <p className="about-wrapper__info-text short">
                  {paragraphOne ||
                    'For your planned investment in Hungary we can offer you our multi-purpose industrial site of 800,000 m2 (80 hectares, 198 acres) in Abasár, Heves county. With approval from the local council you can erect a building with a floor area of up to 240,000 m2 (8.6 million square feet) for a factory or for production or logistics purposes.'}
                </p>
                <p className="about-wrapper__info-text">
                  {paragraphTwo ||
                    'Previously subject to exploration for mining purposes, the land has good structural and geomechanical properties, and there is no need to strip the top soil, only landscaping for the buildings is required.'}
                </p>
                <p className="about-wrapper__info-text">
                  {paragraphThree || 'If your company is looking for a site for its large-scale investment, both the area and the region could be ideal in many respects. Find out more.'}
                </p>
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

export default About;
