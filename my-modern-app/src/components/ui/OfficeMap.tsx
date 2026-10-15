import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { directionsUrl, Office, OfficeId } from '../../config/company';

interface OfficeMapProps {
  offices: Office[];
  selectedId: OfficeId | null;
  onSelect: (id: OfficeId) => void;
  officeNames: Record<OfficeId, string>;
  directionsLabel: string;
  ariaLabel: string;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const markerIcon = (active: boolean, headquarters: boolean) =>
  L.divIcon({
    className: '',
    html: `<div class="bp-marker${active ? ' bp-marker--active' : ''}${headquarters ? ' bp-marker--hq' : ''}"><span></span></div>`,
    iconSize: [36, 46],
    iconAnchor: [18, 44],
    popupAnchor: [0, -40],
  });

const popupHtml = (office: Office, name: string, directionsLabel: string) => `
  <div class="bp-popup">
    <img src="/img/Logo_Bridgepoint_Header.png" alt="" width="110" height="47" />
    <p class="bp-popup__title">${escapeHtml(name)}</p>
    <p class="bp-popup__address">${office.address.map(escapeHtml).join('<br/>')}</p>
    <a class="bp-popup__link" href="${directionsUrl(office)}" target="_blank" rel="noopener noreferrer">${escapeHtml(directionsLabel)} →</a>
  </div>`;

/**
 * Office map built on Leaflet + OpenStreetMap tiles: no API key, no watermark and no cookies.
 * Scroll-wheel zoom only activates after the visitor clicks the map, so page scrolling is never hijacked.
 */
const OfficeMap = ({ offices, selectedId, onSelect, officeNames, directionsLabel, ariaLabel }: OfficeMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<OfficeId, L.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Create the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    offices.forEach((office) => {
      const marker = L.marker([office.lat, office.lng], {
        icon: markerIcon(false, office.id === 'headquarters'),
        keyboard: true,
        riseOnHover: true,
      })
        .addTo(map)
        .on('click', () => onSelectRef.current(office.id));
      markersRef.current.set(office.id, marker);
    });

    map.fitBounds(L.latLngBounds(offices.map((o) => [o.lat, o.lng] as [number, number])), { padding: [60, 60] });
    map.on('click focus', () => map.scrollWheelZoom.enable());
    map.on('mouseout blur', () => map.scrollWheelZoom.disable());
    mapRef.current = map;

    const markers = markersRef.current;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
    // offices come from static config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Popups and tooltips follow the active language
  useEffect(() => {
    offices.forEach((office) => {
      const marker = markersRef.current.get(office.id);
      if (!marker) return;
      const name = officeNames[office.id];
      marker.unbindPopup().bindPopup(popupHtml(office, name, directionsLabel), { closeButton: true, maxWidth: 260 });
      marker.unbindTooltip().bindTooltip(name, { direction: 'top', offset: [0, -42] });
      marker.getElement()?.setAttribute('aria-label', name);
    });
  }, [offices, officeNames, directionsLabel, selectedId]);

  // Highlight and fly to the selected office
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    offices.forEach((office) => {
      markersRef.current.get(office.id)?.setIcon(markerIcon(office.id === selectedId, office.id === 'headquarters'));
    });
    if (!selectedId) return;
    const office = offices.find((o) => o.id === selectedId);
    const marker = markersRef.current.get(selectedId);
    if (!office || !marker) return;
    map.flyTo([office.lat, office.lng], 15, { duration: 1.2 });
    map.once('moveend', () => marker.openPopup());
  }, [selectedId, offices]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className="bp-map w-full h-[420px] md:h-[520px] rounded-2xl shadow-lg overflow-hidden ring-1 ring-gray-200 bg-gray-100 z-0"
    />
  );
};

export default OfficeMap;
