import React, { useState, useEffect, useRef } from 'react';

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  address: string[];
  isHeadquarters?: boolean;
}

interface GoogleMapsContactProps {
  apiKey: string;
  initialSelectedOffice?: string; // "South", "North", "Headquarters"
}

// Global variable to track if the script is already loaded or being loaded
let googleMapsScriptLoading = false;

const GoogleMapsContact: React.FC<GoogleMapsContactProps> = ({ 
  apiKey, 
  initialSelectedOffice = "South" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>(initialSelectedOffice);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  // Define office locations
  const locations: { [key: string]: MapLocation } = {
    "Headquarters": {
      name: "Headquarters",
      lat: 38.54882911385019, 
      lng: -7.9109488713984115,
      address: [
        "PACT – Parque do Alentejo de Ciência e Tecnologia",
        "Rua Luís Adelino Fonseca, lote 1A",
        "7005-345 Évora, PORTUGAL"
      ],
      isHeadquarters: true
    },
    "South": {
      name: "South Office",
      lat: 38.82208852432489,
      lng: -9.088276159181566,
      address: [
        "Rua Bartolomeu Dias, Nº72 Fração L",
        "(EN10 Km138)",
        "2695-715 São João da Talha, PORTUGAL"
      ]
    },
    "North": {
      name: "North Office",
      lat: 42.07189299260265,
      lng: -8.406622779533802,
      address: [
        "Largo da Palmeira, Nº 24",
        "Cabo - Barbeita",
        "4950-045 Monção – Viana do Castelo, PORTUGAL"
      ]
    }
  };

  // Load Google Maps API script
  useEffect(() => {
    // Check if Google Maps is already available
    if (window.google?.maps) {
      setIsMapLoaded(true);
      return;
    }

    // Check if script is already being loaded by another instance
    if (googleMapsScriptLoading) {
      // If so, set up a polling to check when Google Maps becomes available
      const checkGoogleMapsInterval = setInterval(() => {
        if (window.google?.maps) {
          setIsMapLoaded(true);
          clearInterval(checkGoogleMapsInterval);
        }
      }, 100);
      
      // Clean up interval
      return () => {
        clearInterval(checkGoogleMapsInterval);
      };
    }

    // Mark that we're loading the script
    googleMapsScriptLoading = true;

    // Set up callback function for when Maps API loads
    const callbackName = `googleMapsInitCallback_${Date.now()}`;
    window[callbackName] = () => {
      setIsMapLoaded(true);
      delete window[callbackName];
    };

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&loading=async&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Google Maps script failed to load');
      googleMapsScriptLoading = false;
    };
    
    // Add script to document
    document.head.appendChild(script);

    // Clean up
    return () => {
      // In case component unmounts before callback is fired
      if (window[callbackName]) {
        delete window[callbackName];
      }
    };
  }, [apiKey]);

  // Update selected office when prop changes
  useEffect(() => {
    if (initialSelectedOffice && initialSelectedOffice !== selectedOffice) {
      setSelectedOffice(initialSelectedOffice);
    }
  }, [initialSelectedOffice, selectedOffice]);

  // Initialize and update map when needed
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    // Clear existing markers and info windows
    if (googleMapRef.current) {
      clearMarkersAndInfoWindows();
      // Update existing map with new selected office
      updateMapForSelectedOffice();
    } else {
      // Initialize map if it doesn't exist
      initializeMap();
    }
  }, [isMapLoaded, selectedOffice]);

  // Clear markers and info windows
  const clearMarkersAndInfoWindows = () => {
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    infoWindowsRef.current.forEach(infoWindow => {
      infoWindow.close();
    });
    infoWindowsRef.current = [];
  };

  // Initialize map
  const initializeMap = () => {
    if (!window.google?.maps || !mapRef.current) return;

    try {
      const selectedLocation = locations[selectedOffice];
      
      const mapOptions: google.maps.MapOptions = {
        center: { lat: selectedLocation.lat, lng: selectedLocation.lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      googleMapRef.current = new google.maps.Map(mapRef.current, mapOptions);
      
      // Add markers for all locations
      addMarkersToMap();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  // Update map for selected office
  const updateMapForSelectedOffice = () => {
    if (!googleMapRef.current) return;
    
    const selectedLocation = locations[selectedOffice];
    
    // Pan to selected location
    googleMapRef.current.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    googleMapRef.current.setZoom(15);
    
    // Add markers to map
    addMarkersToMap();
  };

  // Add markers to map
  const addMarkersToMap = () => {
    if (!googleMapRef.current || !window.google?.maps) return;

    try {
      Object.entries(locations).forEach(([id, location]) => {
        const isSelected = id === selectedOffice;
        
        // Create marker
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: googleMapRef.current,
          title: location.name,
          animation: isSelected ? google.maps.Animation.DROP : undefined,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: isSelected ? '#FF0000' : (location.isHeadquarters ? '#013fa4' : '#1976D2'),
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: isSelected ? 10 : 8
          },
          zIndex: isSelected ? 100 : 10
        });

        // Create info window content
        const infoWindowContent = `
          <div style="min-width: 200px; padding: 10px;">
            <h3 style="margin: 0 0 8px; color: #013fa4; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0 0 8px; font-size: 14px;">${location.address.join('<br/>')}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" 
               target="_blank" style="display: inline-block; background: #013fa4; color: white; 
               padding: 6px 12px; text-decoration: none; border-radius: 4px; font-size: 14px;">
               Get Directions
            </a>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });

        // Store references
        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);

        // Open info window for selected office
        if (isSelected) {
          infoWindow.open(googleMapRef.current, marker);
        }

        // Add click event
        marker.addListener('click', () => {
          // Close all info windows
          infoWindowsRef.current.forEach(iw => iw.close());
          
          // Open this info window
          infoWindow.open(googleMapRef.current, marker);
          
          // Update selected office
          setSelectedOffice(id);
        });
      });

      // Fit map to show all markers when initializing
      if (markersRef.current.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        
        markersRef.current.forEach(marker => {
          const position = marker.getPosition();
          if (position) bounds.extend(position);
        });
        
        googleMapRef.current.fitBounds(bounds);
        
        // Prevent excessive zoom when there are few markers
        google.maps.event.addListenerOnce(googleMapRef.current, 'idle', () => {
          const currentZoom = googleMapRef.current?.getZoom();
          if (googleMapRef.current && currentZoom !== undefined && currentZoom > 15) {
            googleMapRef.current.setZoom(15);
          }
        });
      }
    } catch (error) {
      console.error('Error adding markers:', error);
    }
  };

  // Get directions URL for selected location
  const getDirectionsUrl = () => {
    const location = locations[selectedOffice];
    return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
  };

  return (
    <div className="w-full">
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden" 
        style={{ backgroundColor: '#f5f5f5' }}
      >
        {!isMapLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Directions button */}
      <div className="mt-4 text-center">
        <a 
          href={getDirectionsUrl()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions to {locations[selectedOffice]?.name}
        </a>
      </div>
    </div>
  );
};

// Add TypeScript support for dynamic callback
declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

export default GoogleMapsContact;