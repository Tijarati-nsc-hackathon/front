import React from 'react';
import LandingPage from '../Components/Landing/LandingPage';
import Support from '../Components/support/support';
import { useScroll } from '../Context/ScrollContext';
import Testimonials from '../Components/Testimonials/Testimonials';
import BenefitsSection from '../Components/BenefitSection/BenefitSection';
import AboutUs from '../Components/About/AboutUs.tsx';
const Home: React.FC = () => {
  const { refs } = useScroll();

  return (
    <>
      <div ref={refs.home}><LandingPage /></div>
      <div ref={refs.AboutUs}><AboutUs /></div>
      <div ref={refs.support}><Support /></div>
      <div ref={refs.Testimonials}><Testimonials /></div>
      <div ref={refs.BenefitsSection}><BenefitsSection /></div>
      {/* Add other sections later */}
    </>
  );
};

export default Home;
