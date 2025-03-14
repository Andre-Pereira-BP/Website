import React, { useEffect, useRef } from 'react';
// Adicionando a definição de tipos para a API do Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isHeadquarters?: boolean;
}

const ContactMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const locations: MapLocation[] = [
    {
      name: "Headquarters",
      lat: 38.5687, 
      lng: -7.9182,
      address: "PACT – Rua Luís Adelino Fonseca, lote 1A, 7005-345 Évora, PORTUGAL",
      isHeadquarters: true
    },
    {
      name: "South Office",
      lat: 38.8156,
      lng: -9.0935,
      address: "Rua Bartolomeu Dias, Nº72 Fração L (EN10 Km138), 2695-715 – São João da Talha, PORTUGAL"
    },
    {
      name: "North Office",
      lat: 42.0781,
      lng: -8.4828,
      address: "Habitat Criativo – Centro de empresas, Av. Afonso III, S/N, 4950-498 Monção – Viana do Castelo, PORTUGAL"
    }
  ];

  useEffect(() => {
    // Load Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initMap;
      document.head.appendChild(googleMapsScript);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      // Center map on Portugal
      const mapOptions = {
        center: { lat: 39.5, lng: -8.2 },
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [{ saturation: -100 }]
          }
        ]
      };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

      // Add markers for each location
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstanceRef.current,
          title: location.name,
          icon: location.isHeadquarters 
            ? { 
                // Usar caminho relativo aos assets do projeto
                url: '/assets/images/marker-hq.png',
                scaledSize: new google.maps.Size(40, 40)
              }
            : { 
                url: '/assets/images/marker-office.png',
                scaledSize: new google.maps.Size(32, 32) 
              }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="min-width: 200px; padding: 10px;">
              <h3 style="margin: 0 0 8px; color: #013fa4; font-weight: 600;">${location.name}</h3>
              <p style="margin: 0; font-size: 14px;">${location.address}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      });

      // Fit map to show all markers
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach(marker => bounds.extend(marker.getPosition()!));
      mapInstanceRef.current.fitBounds(bounds);
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  return (
    <div className="mt-10 shadow-lg rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-96 md:h-[500px]" 
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;