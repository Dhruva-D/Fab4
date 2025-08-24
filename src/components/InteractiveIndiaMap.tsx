import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { indiaStatesData } from '../data/indiaStatesData';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Enhanced Indian states GeoJSON data with more accurate boundaries
const indianStatesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Andhra Pradesh", state_key: "andhra-pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[77.2, 14.4], [84.8, 12.6], [84.4, 19.9], [77.5, 18.3], [77.2, 14.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Arunachal Pradesh", state_key: "arunachal-pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[91.5, 26.0], [97.8, 26.0], [97.8, 29.5], [91.5, 29.5], [91.5, 26.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Assam", state_key: "assam" },
      geometry: {
        type: "Polygon",
        coordinates: [[[89.7, 24.1], [96.0, 24.1], [96.0, 28.2], [89.7, 28.2], [89.7, 24.1]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Bihar", state_key: "bihar" },
      geometry: {
        type: "Polygon",
        coordinates: [[[83.3, 24.2], [88.2, 24.2], [88.2, 27.5], [83.3, 27.5], [83.3, 24.2]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Chhattisgarh", state_key: "chhattisgarh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[79.7, 17.8], [84.4, 17.8], [84.4, 24.1], [79.7, 24.1], [79.7, 17.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Goa", state_key: "goa" },
      geometry: {
        type: "Polygon",
        coordinates: [[[73.7, 14.9], [74.7, 14.9], [74.7, 15.8], [73.7, 15.8], [73.7, 14.9]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Gujarat", state_key: "gujarat" },
      geometry: {
        type: "Polygon",
        coordinates: [[[68.2, 20.1], [74.5, 20.1], [74.5, 24.7], [68.2, 24.7], [68.2, 20.1]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Haryana", state_key: "haryana" },
      geometry: {
        type: "Polygon",
        coordinates: [[[74.4, 27.4], [77.6, 27.4], [77.6, 30.9], [74.4, 30.9], [74.4, 27.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Himachal Pradesh", state_key: "himachal-pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[75.5, 30.4], [79.0, 30.4], [79.0, 33.2], [75.5, 33.2], [75.5, 30.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Jharkhand", state_key: "jharkhand" },
      geometry: {
        type: "Polygon",
        coordinates: [[[83.3, 21.9], [87.6, 21.9], [87.6, 25.3], [83.3, 25.3], [83.3, 21.9]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Karnataka", state_key: "karnataka" },
      geometry: {
        type: "Polygon",
        coordinates: [[[74.0, 11.5], [78.6, 11.5], [78.6, 18.4], [74.0, 18.4], [74.0, 11.5]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kerala", state_key: "kerala" },
      geometry: {
        type: "Polygon",
        coordinates: [[[74.9, 8.2], [77.4, 8.2], [77.4, 12.8], [74.9, 12.8], [74.9, 8.2]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Madhya Pradesh", state_key: "madhya-pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[74.0, 21.1], [82.8, 21.1], [82.8, 26.9], [74.0, 26.9], [74.0, 21.1]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Maharashtra", state_key: "maharashtra" },
      geometry: {
        type: "Polygon",
        coordinates: [[[72.7, 15.6], [80.9, 15.6], [80.9, 22.0], [72.7, 22.0], [72.7, 15.6]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Manipur", state_key: "manipur" },
      geometry: {
        type: "Polygon",
        coordinates: [[[93.0, 23.8], [94.8, 23.8], [94.8, 25.7], [93.0, 25.7], [93.0, 23.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Meghalaya", state_key: "meghalaya" },
      geometry: {
        type: "Polygon",
        coordinates: [[[89.7, 25.0], [92.8, 25.0], [92.8, 26.1], [89.7, 26.1], [89.7, 25.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Mizoram", state_key: "mizoram" },
      geometry: {
        type: "Polygon",
        coordinates: [[[92.2, 21.9], [93.7, 21.9], [93.7, 24.5], [92.2, 24.5], [92.2, 21.9]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Nagaland", state_key: "nagaland" },
      geometry: {
        type: "Polygon",
        coordinates: [[[93.3, 25.2], [95.8, 25.2], [95.8, 27.0], [93.3, 27.0], [93.3, 25.2]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Odisha", state_key: "odisha" },
      geometry: {
        type: "Polygon",
        coordinates: [[[81.4, 17.8], [87.5, 17.8], [87.5, 22.6], [81.4, 22.6], [81.4, 17.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Punjab", state_key: "punjab" },
      geometry: {
        type: "Polygon",
        coordinates: [[[73.9, 29.5], [76.9, 29.5], [76.9, 32.5], [73.9, 32.5], [73.9, 29.5]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Rajasthan", state_key: "rajasthan" },
      geometry: {
        type: "Polygon",
        coordinates: [[[69.5, 23.0], [78.3, 23.0], [78.3, 30.2], [69.5, 30.2], [69.5, 23.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Sikkim", state_key: "sikkim" },
      geometry: {
        type: "Polygon",
        coordinates: [[[88.0, 27.1], [88.9, 27.1], [88.9, 28.1], [88.0, 28.1], [88.0, 27.1]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Tamil Nadu", state_key: "tamil-nadu" },
      geometry: {
        type: "Polygon",
        coordinates: [[[76.2, 8.1], [80.3, 8.1], [80.3, 13.6], [76.2, 13.6], [76.2, 8.1]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Telangana", state_key: "telangana" },
      geometry: {
        type: "Polygon",
        coordinates: [[[77.3, 15.8], [81.3, 15.8], [81.3, 19.9], [77.3, 19.9], [77.3, 15.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Tripura", state_key: "tripura" },
      geometry: {
        type: "Polygon",
        coordinates: [[[91.0, 22.9], [92.7, 22.9], [92.7, 24.5], [91.0, 24.5], [91.0, 22.9]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Uttar Pradesh", state_key: "uttar-pradesh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[77.1, 24.0], [84.6, 24.0], [84.6, 30.4], [77.1, 30.4], [77.1, 24.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Uttarakhand", state_key: "uttarakhand" },
      geometry: {
        type: "Polygon",
        coordinates: [[[77.6, 28.4], [81.0, 28.4], [81.0, 31.4], [77.6, 31.4], [77.6, 28.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "West Bengal", state_key: "west-bengal" },
      geometry: {
        type: "Polygon",
        coordinates: [[[85.8, 21.5], [89.9, 21.5], [89.9, 27.2], [85.8, 27.2], [85.8, 21.5]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Delhi", state_key: "delhi" },
      geometry: {
        type: "Polygon",
        coordinates: [[[76.8, 28.4], [77.3, 28.4], [77.3, 28.9], [76.8, 28.9], [76.8, 28.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Jammu & Kashmir", state_key: "jammu-kashmir" },
      geometry: {
        type: "Polygon",
        coordinates: [[[73.3, 32.2], [80.3, 32.2], [80.3, 37.1], [73.3, 37.1], [73.3, 32.2]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Ladakh", state_key: "ladakh" },
      geometry: {
        type: "Polygon",
        coordinates: [[[75.9, 32.2], [80.1, 32.2], [80.1, 36.0], [75.9, 36.0], [75.9, 32.2]]]
      }
    }
  ]
};

interface InteractiveIndiaMapProps {}

const InteractiveIndiaMap: React.FC<InteractiveIndiaMapProps> = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [showDiscoverHint, setShowDiscoverHint] = useState(true);

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  // Hide the discovery hint after 5 seconds or when user first hovers
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscoverHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hoveredState) {
      setShowDiscoverHint(false);
    }
  }, [hoveredState]);

  const closeModal = () => {
    setSelectedState(null);
  };

  // Navigate to marketplace with state filter
  const exploreArtworks = (stateName: string) => {
    // Navigate to marketplace with state filter
    const stateParam = stateName === 'All States' ? '' : stateName;
    window.location.href = `/marketplace${stateParam ? `?state=${encodeURIComponent(stateParam)}` : ''}`;
  };

  // Style function for GeoJSON layers
  const stateStyle = useCallback((feature: any) => {
    const isSelected = feature.properties.state_key === selectedState;
    const isHovered = feature.properties.state_key === hoveredState;
    
    return {
      fillColor: isSelected ? '#FF6B35' : isHovered ? '#FFA500' : 'transparent',
      weight: isSelected ? 3 : isHovered ? 2 : 0,
      opacity: isSelected ? 1 : isHovered ? 1 : 0,
      color: isSelected ? '#800000' : isHovered ? '#800000' : 'transparent',
      fillOpacity: isSelected ? 0.8 : isHovered ? 0.3 : 0,
    };
  }, [selectedState, hoveredState]);

  // Event handlers for GeoJSON layers
  const onEachFeature = useCallback((feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        setHoveredState(feature.properties.state_key);
        e.target.setStyle({
          weight: 2,
          fillOpacity: 0.4,
          fillColor: '#FFA500',
          color: '#800000',
          opacity: 1
        });
      },
      mouseout: (e: any) => {
        setHoveredState(null);
        // Return to invisible state if not selected
        const isSelected = feature.properties.state_key === selectedState;
        e.target.setStyle({
          fillColor: isSelected ? '#FF6B35' : 'transparent',
          weight: isSelected ? 3 : 0,
          opacity: isSelected ? 1 : 0,
          color: isSelected ? '#800000' : 'transparent',
          fillOpacity: isSelected ? 0.8 : 0,
        });
      },
      click: (e: any) => {
        if (indiaStatesData[feature.properties.state_key as keyof typeof indiaStatesData]) {
          setSelectedState(feature.properties.state_key);
        }
        e.target.setStyle({
          fillColor: '#FF6B35',
          fillOpacity: 0.8,
          weight: 3,
          color: '#800000',
          opacity: 1
        });
      }
    });

    // Bind tooltip with state name - only show on hover
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: 'center',
      className: 'state-tooltip',
      opacity: 0.95
    });
  }, [selectedState, stateStyle]);

  return (
    <div id="interactive-map" className="w-full py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold header-indian mb-4">🇮🇳 Explore India's Rich Heritage 🎨</h2>
        <p className="text-lg text-stone-700">Click on any state on the map to discover its unique art forms and cultural traditions</p>
      </div>

      {/* Interactive Map */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl border-4 border-amber-400 overflow-hidden mb-6 relative">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '600px', width: '100%' }}
            className="leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={indianStatesGeoJSON as any}
              style={stateStyle}
              onEachFeature={onEachFeature}
            />
          </MapContainer>

          {/* Discovery Hint Overlay */}
          {showDiscoverHint && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000] discovery-hint">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                <span className="text-lg font-bold drop-shadow-lg">✨ Hover over the map to discover Indian states! ✨</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick State Selection */}
        <div className="text-center">
          <p className="text-stone-600 mb-4">
            💡 <strong>Tip:</strong> Hover over the map to discover states, click to explore their art forms!
          </p>
          
          {/* Quick access buttons for popular states */}
          <div className="flex flex-wrap justify-center gap-2">
            {['rajasthan', 'gujarat', 'maharashtra', 'kerala', 'tamil-nadu', 'west-bengal'].map((stateKey) => {
              const stateData = indiaStatesData[stateKey as keyof typeof indiaStatesData];
              return (
                <button
                  key={stateKey}
                  onClick={() => setSelectedState(stateKey)}
                  className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-stone-700 rounded-full text-sm font-medium transition-colors border border-amber-300 hover:border-amber-400"
                >
                  {stateData.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for showing state details */}
      {selectedState && selectedStateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-400">
            <div className="p-6" style={{background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e2 100%)'}}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold header-indian">{selectedStateData.name}</h2>
                <button 
                  onClick={closeModal}
                  className="text-stone-700 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-stone-700 text-lg leading-relaxed mb-4">
                  {selectedStateData.story}
                </p>
                <p className="text-sm text-stone-600">
                  <strong>Capital:</strong> {selectedStateData.capital}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{color: '#800000'}}>Traditional Art Forms</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedStateData.artforms.map((artform, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 hover:bg-yellow-50 transition-colors border-2 border-amber-200 hover:border-amber-400">
                      <img 
                        src={artform.image} 
                        alt={artform.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                        }}
                      />
                      <h4 className="font-semibold mb-2" style={{color: '#800000'}}>{artform.name}</h4>
                      <p className="text-sm text-stone-700">{artform.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center flex gap-4 justify-center">
                <button 
                  onClick={() => exploreArtworks(selectedStateData.name)}
                  className="btn-indian px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  View Artworks from {selectedStateData.name}
                </button>
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 bg-stone-200 text-stone-700 hover:bg-stone-300 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for tooltips and map styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .state-tooltip {
          background: rgba(128, 0, 0, 0.95) !important;
          color: white !important;
          border: none !important;
          border-radius: 8px !important;
          font-weight: bold !important;
          padding: 10px 16px !important;
          font-size: 16px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
          backdrop-filter: blur(4px) !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3) !important;
        }
        
        .state-tooltip::before {
          border-top-color: rgba(128, 0, 0, 0.95) !important;
        }
        
        .leaflet-container {
          font-family: inherit !important;
        }
        
        .leaflet-control-zoom {
          border: 2px solid #800000 !important;
          border-radius: 8px !important;
        }
        
        .leaflet-control-zoom a {
          background-color: #fff8f0 !important;
          color: #800000 !important;
          border-bottom: 1px solid #800000 !important;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: #fef3e2 !important;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        
        .discovery-hint {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .discovery-hint.fade-out {
          animation: fadeOut 0.5s ease-in-out forwards;
        }
        `
      }} />
    </div>
  );
};

export default InteractiveIndiaMap;
