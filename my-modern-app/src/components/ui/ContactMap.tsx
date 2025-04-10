import React from 'react';
import GoogleMapsContact from './GoogleMapsContact';

interface ContactMapProps {
  selectedOffice?: string;
}

const ContactMap: React.FC<ContactMapProps> = ({ selectedOffice = "South" }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  
  return (
    <div className="w-full">
      <GoogleMapsContact 
        apiKey={apiKey} 
        initialSelectedOffice={selectedOffice} 
      />
    </div>
  );
};

export default ContactMap;
