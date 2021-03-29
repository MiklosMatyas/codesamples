import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';

const Facts = () => {
  const { facts } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree, resume } = facts;

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
    <section id="facts">
      <Container>
        <Title title="Facts about" titleSub="HUNGARY" />
        <div className="facts-wrapper">
          <div>
            <Fade left={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">
                  {paragraphOne ||
                    'Centrally located in Europe, Hungary has been a member of the European Union since 2004.'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                  {paragraphTwo ||
                    'Hungary has a deep pool of skilled workers available. The country has a population of 9.7 million, 50% of its young people have higher-education degrees, yet wage levels are low within the EU. The average salary is EUR 1,035 (2018), which enables significant productivity in high value-added manufacturing investments.'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                  {paragraphThree || 'Significant large-scale investments have been completed in Hungary thanks to the favourable investment environment. Many large automotive companies have production operations in Hungary, including Mercedes, Audi, Opel and Suzuki, while there is a new BMW plant currently under construction in Debrecen. Per capita, Hungary is among the world’s top manufacturers of cars and automotive products.'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                    { 'Hungary has advanced financial infrastructure: the biggest banks of the European Union and the region are established in the country. It has a unique transfer system, where transfers are credited promptly within 5 seconds. This means transfers initiated at any of the country’s banks are credited within no more than 5 seconds to accounts held at bank branches of any bank in the country.' }
                </p>
                <hr className="line" />
              </div>
            </Fade>
          </div>
          <div>
            <Fade bottom={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">
                  {paragraphOne ||
                    'Stable and predictable environment, business-friendly.'}
                </p>
                <hr className="line" />
                <div className="about-wrapper__image">
                    <AboutImg alt="profile picture" filename={img} />
                </div>
                <p className="about-wrapper__info-text">
                  {paragraphTwo ||
                    'Hungary is a beautiful country with a high standard of living: the wonderful city of Budapest with its architectural and natural environment, its gastrocuisine, the charming countryside and friendly Hungarians make you feel at home.'}
                </p>
                <hr className="line" />
              </div>
            </Fade>
          </div>
          <div>
            <Fade right={isDesktop} bottom={isMobile} duration={500} delay={500} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">
                  {paragraphOne ||
                    'The Hungarian Government regularly provides significant, non-refundable grants and tax allowances for large investments.'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                  {paragraphTwo ||
                    'Advanced infrastructure (one of the highest lengths of motorway per square kilometre within the European Union, high-speed railways under constant development).'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                  {paragraphThree || 'Low tax rates (9-19% corporate income tax, 15% personal income tax, 18.5% social security contribution), simple and digital company administration.'}
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                    { 'Low average prices for intermediate goods (low energy prices, low real estate prices, low interest rates)' }
                </p>
                <hr className="line" />
                <p className="about-wrapper__info-text">
                    { 'COVID-19: Hungary dealt with the first wave of the pandemic well, becoming a safe country with low infection rates. The Hungarian figures are among the lowest in the European Union, without the government having paralysed the nation’s economy.' }
                </p>
                <hr className="line" />
              </div>
            </Fade>
          </div>          
        </div>
        <Row className="about-wrapper row-2">
          <Col md={12} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">
                  { 'For more information about investing in Hungary, please visit the Hungarian Investment Promotion Agency’s website (www.hipa.hu), where you can find detailed microdata and information about investments in Hungary (www.hipa.hu/main#publications).' }
                </p>
              </div>
            </Fade>
          </Col>
        </Row>        

      </Container>
    </section>
  );
};

export default Facts;
