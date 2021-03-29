import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';

const Video = () => {

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
    <section id="video">
      <Container id="video-view">
        <Row className="about-wrapper">
          <Col md={12} sm={12}>
            <Fade bottom={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/A_2zZMRd1mw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Video;
