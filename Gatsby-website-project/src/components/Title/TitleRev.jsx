import React from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

const Title = ({ title, titleSub }) => (
  <Fade bottom duration={1000} delay={300} distance="0px">
    <h2 className="section-title">{title}<br /> <span className="calibri-light">{titleSub}</span></h2>
    <hr className="line" />
  </Fade>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
