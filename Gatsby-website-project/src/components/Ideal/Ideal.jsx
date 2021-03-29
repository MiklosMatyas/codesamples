import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Automotive from "../svgs/automotive.svg";
import Processing from "../svgs/processing.svg";
import Metal from "../svgs/metal.svg";
import Chemical from "../svgs/chemical.svg";
import Manufacturing from "../svgs/manufacturing.svg";

const Ideal = () => {
  const { ideal } = useContext(PortfolioContext);

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
    <section id="ideal">
      <Container>
        <h2>THE INDUSTRIAL SITE IS IDEAL FOR</h2>
        <Row className="ideal-wrapper">
          <Col>
            <Fade bottom={isDesktop} bottom={isMobile} duration={1000} delay={100} distance="60px">
              <div className="about-wrapper__info blue-line">
                <div className="picto-wrapper">
                  <Automotive />
                </div>
                <p className="about-wrapper__info-text">
                    automotive industry investments
                </p>
              </div>
            </Fade>
          </Col>
          <Col>
            <Fade bottom={isDesktop} bottom={isMobile} duration={1000} delay={200} distance="60px">
              <div className="about-wrapper__info blue-line">
                <div className="picto-wrapper">
                  <Processing />
                </div>
                <p className="about-wrapper__info-text">
                    processing industry investments
                </p>
              </div>
            </Fade>
          </Col>
          <Col>
            <Fade bottm={isDesktop} bottom={isMobile} duration={1000} delay={300} distance="60px">
              <div className="about-wrapper__info blue-line">
                <div className="picto-wrapper">
                  <Metal />
                </div>
                <p className="about-wrapper__info-text">
                    metallurgical industry investments
                </p>
              </div>
            </Fade>
          </Col>
          <Col>
            <Fade bottom={isDesktop} bottom={isMobile} duration={1000} delay={400} distance="60px">
              <div className="about-wrapper__info blue-line">
                <div className="picto-wrapper">
                  <Chemical />
                </div>
                <p className="about-wrapper__info-text">
                    chemical<br /> industry<br /> investments
                </p>
              </div>
            </Fade>
          </Col>
          <Col>
            <Fade bottom={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="60px">
              <div className="about-wrapper__info blue-line">
                <div className="picto-wrapper">
                  <Manufacturing />
                </div>
                <p className="about-wrapper__info-text">
                    manufacturing of large and medium-sized goods production centres
                </p>
              </div>
            </Fade>
          </Col>
        </Row>
        <Row className="row-2">
            <Col>
            <p>REQUIRING MANUFACTURING BUILDINGS OF UP TO 240,000 SQUARE METRES</p>
            </Col>
        </Row>

        <div id="partner"></div>
        <h2>YOUR PARTNER IN THE TRANSACTION IS THE MAB GROUP</h2>
        <Row className="row-3">
            <Col md={3} sm={12} className="blue-line">
                <p>100% Hungarian-owned medium-sized company with a history of 24 years</p>
            </Col>
            <Col md={2} sm={12} className="blue-line">
                <p>Annual sales revenue of EUR 15 million</p>
            </Col>
            <Col md={1} sm={12} className="blue-line">
                <p><span className="big-1">70</span> employees</p>
            </Col>
            <Col md={6} sm={12} className="blue-line pl-md-5">
                <p>Experienced in property development and utilisation, mining, pharmaceutical industry, business administration, legal advisory and the financial sector in Hungary</p>
            </Col>
        </Row>


      </Container>
    </section>
  );
};

export default Ideal;
