const ServiceCard = ({ image, title, icon, description, items }: {
    image: string;
    title: string;
    icon: string;
    description: string;
    items: string[];
  }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
          <p className="mb-4 text-gray-700">{description}</p>
          {items && (
            <ul className="space-y-1 mb-4">
              {items.map((item, idx) => (
                <li key={idx} className="font-medium">{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  const Services = () => {
    const services = [
      {
        title: "Automotive",
        icon: "⚙️",
        image: "img/general/car_interior-crop.jpg",
        description: "BridgePoint Test Systems",
        items: [
          "Infotainment",
          "Instrument Clusters",
          "Display Systems",
          "Compressors",
          "Intercoolers"
        ]
      },
      {
        title: "Electric Vehicles",
        icon: "⚡",
        image: "img/general/ev_chargers-crop.jpg",
        description: "BridgePoint Test Systems",
        items: [
          "E-Motors",
          "Inverters",
          "Battery Management Systems",
          "Electronic Control Units",
          "Battery Coolers"
        ]
      },
      {
        title: "Electronic Components",
        icon: "🔌",
        image: "img/general/chip.jpg",
        description: "BridgePoint Test Systems",
        items: [
          "Capacitors",
          "Relays",
          "PCB's"
        ]
      }
    ];
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Services;