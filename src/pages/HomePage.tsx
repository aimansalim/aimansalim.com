import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { UniSpotSection } from '../components/UniSpotSection';
import { ContentCreatorSection } from '../components/ContentCreatorSection';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <ExperienceSection />
      <UniSpotSection />
      <ContentCreatorSection />
    </div>
  );
};

export default HomePage;
