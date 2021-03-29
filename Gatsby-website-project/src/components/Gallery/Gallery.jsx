import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/TitleRev';
import ProjectImg from '../Image/ProjectImg';

const Gallery = () => {
  const { gallery } = useContext(PortfolioContext);

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
    <section id="gallery">
      <Container>
        <div className="project-wrapper" id="gallery-view">
          <Title title="HUNGARY" titleSub="IN PICTURES" />
          <Row>
            <Col lg={12} sm={12}>
                <Carousel
                    showArrows="true"
                    controls="true"
                    justify-self="end"
                    align-self="center"
                    control-prev-icon-color="invert(100%)"
                    control-next-icon-color="invert(100%)"
                    >
                    {gallery.map((item) => {
                        const { title, info, info2, url, repo, img, id } = item;
                        return (
                            <Carousel.Item>
                                <ProjectImg alt={title} filename={img} />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>        
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Gallery;
