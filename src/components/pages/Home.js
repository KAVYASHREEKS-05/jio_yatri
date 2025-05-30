import React from 'react'
import Header from './Header'
import '../../styles/Home.css'; 
import HeroSection from './HeroSection';
 import WelcomeSection from './WelcomeSection';
import ServiceSection from './ServiceSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import Contact from './Contact'
import PorterPromo from './PorterPromo';
import NetworkSection from './NetworkSection';
import WhyChoosePorter from './WhyChoosePorter';
import FAQSection from './FAQSection';
import BookingPorterSection from './BookingPorterSection';
import HelpCenter from './HelpCenter';
import HouseShiftingFeatures from './HouseShiftingFeatures';
import GroupedCitiesAndDistricts from './GroupedCitiesAndDistricts';
// import UserShipment from '../UserShipments'
const Home = () => {
  return (
    <div>
      <Header/>
     <HeroSection/> 
      <WelcomeSection/>
       <ServiceSection/>
       <HelpCenter/>
       <WhyChoosePorter/>
       <PorterPromo/>
       <BookingPorterSection/>
      <TestimonialsSection/>
      <NetworkSection/>
      <HouseShiftingFeatures/>
      <GroupedCitiesAndDistricts/>
      <Contact/>
      <FAQSection/>
       {/* <UserShipment/> */}
      <Footer/> 
       
    </div>
  )
}

export default Home
