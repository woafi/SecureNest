import React from 'react'
import { Helmet } from "@dr.pogodin/react-helmet";
import LOGO from '../components/LOGO';
import FeaturesGrid from '../components/FeaturesGrid';
import CTAsection from '../components/CTAsection';

const Landing: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>SecureNest | Secure Your Passwords with Ease</title>
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Logo Section */}
        <LOGO />
        {/* Features Grid */}
        <FeaturesGrid />
        {/* CTA Section */}
        <CTAsection />
      </section>

    </>
  )
}

export default Landing
