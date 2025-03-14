import React from 'react';

interface TeamMemberCardProps {
  name: string;
  position: string;
  phone: string;
  email: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  name, 
  position, 
  phone, 
  email, 
  image 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay with contact information */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-bold font-montserrat mb-1">{name}</h3>
          <p className="text-white/90 text-sm mb-4 font-ptsans">{position}</p>
          
          <div className="space-y-2 text-white/90 text-sm font-ptsans">
            <p><span className="inline-block w-6">📱</span> {phone}</p>
            <p><span className="inline-block w-6">✉️</span> {email}</p>
          </div>
        </div>
      </div>
      
      {/* Non-hover display */}
      <div className="p-5 bg-white">
        <h3 className="text-primary text-xl font-bold font-montserrat mb-1">{name}</h3>
        <p className="text-gray-600 font-ptsans">{position}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;