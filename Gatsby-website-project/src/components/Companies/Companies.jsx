import React, { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';
import LogoImg from '../Image/LogoImg';

const Companies = () => {
  const { companies } = useContext(PortfolioContext);

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
    <section id="companies">
      <Container>
        <Title title="GLOBAL COMPANIES THAT PREVIOUSLY" titleSub="CHOSE HUNGARY" />
        <Row className="about-wrapper">
          <Col md={12} sm={12}>
              <div className="about-wrapper__info">
              <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
                <p className="about-wrapper__info-text">
                    <i>Some of the global brands and manufacturers making products or parts of products in Hungary.</i>
                </p>
                <p className="companies-wrapper__info-text blue">
                    Audi, Mercedes-Benz, Samsung, Suzuki, Wizz-Air, Flextronics, Robert Bosch, Sanofi Aventis, Electrolux, Continental, Hankook, Teva, Lear Corporation, Denso, Opel, Valeo Auto Electric, Grundfos, BMW, Airbus, Doosan
                </p>
                <Row className="logos">
                    
                {companies.map((company) => {
                  const { title, img, id } = company;
                    return (
                      <Col className={title}>
                            <LogoImg alt={title} filename={img} />
                        </Col>
                    );
                })}
                </Row>
              </Fade>
              <Fade right={isDesktop} bottom={isMobile} duration={500} delay={1000} distance="30px">
                <div id="invest">
                  <h3>SUMMARY OF INVESTMENT OPPORTUNITIES AND&nbsp;THE ECONOMIC ENVIRONMENT IN HUNGARY</h3>
                  <p className="info-text">
                  You can find more information about investment opportunities, the Hungarian economic climate, taxation and administration, and investment support programmes (non-refundable grants) at the following link:
                  </p>
                  <p className="link-1"><a href="https://hipa.hu/main#publications">hipa.hu/main#publications</a></p>
                  <p><a href="https://hipa.hu">www.hipa.hu</a></p>
                </div>
              </Fade>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Companies;
