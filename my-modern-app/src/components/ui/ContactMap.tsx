import React from 'react';
import GoogleMapsContact from './GoogleMapsContact';

interface ContactMapProps {
  selectedOffice?: string;
}

const ContactMap: React.FC<ContactMapProps> = ({ selectedOffice = "South" }) => {
  const apiKey = "AIzaSyDnjSgKXYaTWu99-KVVC_zWmKOCE3Cn_RQ";
  
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
