
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <BeforeAfterGallery />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
