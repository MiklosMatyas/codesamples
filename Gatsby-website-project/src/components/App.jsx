import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SidebarTop from './Sidebar/SidebarTop';
import Hero from './Hero/Hero';
import About from './About/About';
import Facts from './Facts/Facts';
import Features from './Features/Features';
import Video from './Video/Video';
import Ideal from './Ideal/Ideal';
import Gallery from './Gallery/Gallery';
import Contact from './Contact/Contact';
import Companies from './Companies/Companies';
import Footer from './Footer/Footer';

import { PortfolioProvider } from '../context/context';

import { heroData, aboutData, factsData, featuresData, galleryData, contactData, companiesData, footerData } from '../mock/data';

import audio_silence from "./audio/silence.mp3";
import audio_ogg from "./audio/zene2.oga";


function App() {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [facts, setFacts] = useState({});
  const [features, setFeatures] = useState({});
  const [gallery, setGallery] = useState([]);
  const [contact, setContact] = useState({});
  const [companies, setCompanies] = useState([]);
  const [footer, setFooter] = useState({});
  
  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setFacts({ ...factsData });
    setFeatures({ ...featuresData });
    setGallery([...galleryData]);
    setContact({ ...contactData });
    setCompanies([ ...companiesData ]);
    setFooter({ ...footerData });
  }, []);
  

  return (
    <PortfolioProvider value={{ hero, about, facts, features, gallery, contact, companies, footer }}>
      <iframe src={audio_silence} type='audio/mp3' allow='autoplay' id='audio' className="nodisplay" ></iframe>
      <audio autoPlay loop id="player_audio" name="player_audio" >
			  <source src={audio_ogg} type="audio/ogg" />
	    </audio>
      <div id="top-menu-container">
        <SidebarTop outerContainerId={'top-menu-container'} />
      </div>
      <div className="App" id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <Hero />
          <About />
          <Facts />
          <Features />
          <Video />
          <Ideal />
          <Companies />
          <Gallery />
          <Contact />
          <Footer />
        </div>
      </div>
    </PortfolioProvider>
  );
}

export default App;
