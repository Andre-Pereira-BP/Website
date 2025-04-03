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

const GoogleMapsContact: React.FC<GoogleMapsContactProps> = ({ 
  apiKey, 
  initialSelectedOffice = "South" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>(initialSelectedOffice);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  // Definir localizações dos escritórios
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

  // Carrega a API do Google Maps dinamicamente
  useEffect(() => {
    if (typeof window === 'undefined' || window.google) return;

    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsMapLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, [apiKey]);

  // Inicializa o mapa quando a API é carregada ou quando o escritório selecionado muda
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    // Limpar marcadores existentes
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    }

    // Selecionar o escritório inicial
    const selectedLocation = locations[selectedOffice];
    
    // Inicializar o mapa
    const mapOptions: google.maps.MapOptions = {
      center: { lat: selectedLocation.lat, lng: selectedLocation.lng },
      zoom: 200,
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

    // Adicionar marcadores para todos os escritórios
    Object.keys(locations).forEach((locKey) => {
      const location = locations[locKey];
      const isSelected = locKey === selectedOffice;
      
      // Selecionar ícone baseado no tipo de escritório e se está selecionado
      let iconUrl = isSelected 
        ? '/marker-selected.png'
        : location.isHeadquarters 
          ? '/marker-hq.png' 
          : '/marker-office.png';
      
      // Fallback para ícones padrão do Google Maps se os personalizados não estiverem disponíveis
      const icon = {
        url: iconUrl,
        scaledSize: new google.maps.Size(isSelected ? 40 : 32, isSelected ? 40 : 32),
        // Se os ícones personalizados não estiverem disponíveis, usar cores para diferenciar
        fallback: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: isSelected ? '#FF0000' : (location.isHeadquarters ? '#013fa4' : '#1976D2'),
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
          scale: isSelected ? 10 : 8
        }
      };

      // Criar um ícone personalizado ou usar o fallback
      let markerIcon;
      const img = new Image();
      img.src = icon.url;
      img.onload = () => {
        markerIcon = {
          url: icon.url,
          scaledSize: icon.scaledSize
        };
      };
      img.onerror = () => {
        markerIcon = icon.fallback;
      };

      // Verificar se o mapa existe
      if (!googleMapRef.current) return;

      // Criar marcador
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: googleMapRef.current,
        title: location.name,
        animation: isSelected ? google.maps.Animation.DROP : undefined,
        icon: markerIcon || icon.fallback,
        zIndex: isSelected ? 100 : 10
      });

      // Criar conteúdo da janela de informações
      const infoWindowContent = `
        <div style="min-width: 200px; padding: 10px;">
          <h3 style="margin: 0 0 8px; color: #013fa4; font-weight: 600;">${location.name}</h3>
          <p style="margin: 0; font-size: 14px;">${location.address.join('<br/>')}</p>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      // Abrir janela de informações no marcador selecionado
      if (isSelected) {
        infoWindow.open(googleMapRef.current, marker);
      }

      // Adicionar eventos de clique
      marker.addListener('click', () => {
        // Verificar se o mapa existe
        if (!googleMapRef.current) return;
        
        // Fechar todas as janelas de informações abertas
        markersRef.current.forEach(m => {
          google.maps.event.clearListeners(m, 'closeclick');
        });

        // Atualizar estado para o escritório selecionado
        setSelectedOffice(locKey);
        
        // Centralizar mapa no marcador clicado
        googleMapRef.current.panTo(marker.getPosition() as google.maps.LatLng);
        
        // Abrir janela de informações
        infoWindow.open(googleMapRef.current, marker);
      });

      // Adicionar marcador à referência
      markersRef.current.push(marker);
    });

    // Ajustar zoom para mostrar todos os marcadores (caso o usuário dê zoom out)
    const bounds = new google.maps.LatLngBounds();
    markersRef.current.forEach(marker => {
      bounds.extend(marker.getPosition() as google.maps.LatLng);
    });

    if (markersRef.current.length > 1 && googleMapRef.current) {
        googleMapRef.current.fitBounds(bounds);
        
        // Verificar se o zoom está muito grande e ajustá-lo
        // Na linha 217, adicione uma verificação de tipo não nulo (non-null assertion operator)
    google.maps.event.addListenerOnce(googleMapRef.current!, 'idle', () => {
    if (googleMapRef.current && googleMapRef.current.getZoom()! > 15) {
      googleMapRef.current.setZoom(15);
    }
  });
      }

  }, [isMapLoaded, selectedOffice]);

  // Atualizar mapa quando o escritório selecionado mudar externamente
  const handleOfficeSelect = (office: string) => {
    setSelectedOffice(office);
  };

  return (
    <div className="w-full">
      {/* Seletor de escritórios */}
      <div className="mb-4 flex flex-wrap justify-center gap-3">
        {Object.keys(locations).map((locKey) => (
          <button
            key={locKey}
            onClick={() => handleOfficeSelect(locKey)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedOffice === locKey
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {locations[locKey].name}
          </button>
        ))}
      </div>

      {/* Container do mapa */}
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
    </div>
  );
};

export default GoogleMapsContact;