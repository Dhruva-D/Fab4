import React, { useState } from 'react';
import { indiaStatesData } from '../data/indiaStatesData';
import './IndiaMap.css';

const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false
  });

  // State code mapping for the SVG paths (IN-XX format to our state keys)
  const stateCodeMapping: { [key: string]: string } = {
    'IN-AP': 'andhraPradesh',
    'IN-AR': 'arunachalPradesh',
    'IN-AS': 'assam',
    'IN-BR': 'bihar',
    'IN-CT': 'chhattisgarh',
    'IN-GA': 'goa',
    'IN-GJ': 'gujarat',
    'IN-HR': 'haryana',
    'IN-HP': 'himachalPradesh',
    'IN-JH': 'jharkhand',
    'IN-KA': 'karnataka',
    'IN-KL': 'kerala',
    'IN-MP': 'madhyaPradesh',
    'IN-MH': 'maharashtra',
    'IN-MN': 'manipur',
    'IN-ML': 'meghalaya',
    'IN-MZ': 'mizoram',
    'IN-NL': 'nagaland',
    'IN-OR': 'odisha',
    'IN-PB': 'punjab',
    'IN-RJ': 'rajasthan',
    'IN-SK': 'sikkim',
    'IN-TN': 'tamilNadu',
    'IN-TG': 'telangana',
    'IN-TR': 'tripura',
    'IN-UP': 'uttarPradesh',
    'IN-UT': 'uttarakhand',
    'IN-WB': 'westBengal',
    'IN-AN': 'andamanNicobar',
    'IN-CH': 'chandigarh',
    'IN-DN': 'dadraNagarHaveli',
    'IN-DL': 'delhi',
    'IN-JK': 'jammuKashmir',
    'IN-LA': 'ladakh',
    'IN-LD': 'lakshadweep',
    'IN-PY': 'puducherry'
  };

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  const handleStateClick = (stateCode: string) => {
    const stateKey = stateCodeMapping[stateCode];
    if (stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      setSelectedState(stateKey);
    }
  };

  const handleStateMouseEnter = (stateCode: string, event: React.MouseEvent) => {
    const stateKey = stateCodeMapping[stateCode];
    if (stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      setHoveredState(stateKey);
      const containerRect = (event.currentTarget.closest('.india-map-container') as Element)?.getBoundingClientRect();
      if (containerRect) {
        setTooltip({
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top,
          visible: true
        });
      }
    }
  };

  const handleStateMouseLeave = () => {
    setHoveredState(null);
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const getStateColor = (stateCode: string) => {
    const stateKey = stateCodeMapping[stateCode];
    if (hoveredState === stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      return indiaStatesData[stateKey as keyof typeof indiaStatesData].color;
    }
    return '#f97316'; // Default orange color
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Title Section */}
      <div className="map-title mx-auto max-w-4xl mb-8">
        <h2>🇮🇳 Explore India's Rich Heritage 🎨</h2>
        <p>Click on any state to discover its unique art forms and cultural traditions</p>
        <div className="decorative-border mt-4"></div>
      </div>

      {/* Map Container */}
      <div className="india-map-container relative flex justify-center">
        <svg
          width="600"
          height="600"
          viewBox="0 0 566 707"
          className="india-map-svg max-w-full h-auto cursor-pointer"
          style={{ filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Andaman and Nicobar Islands */}
          <path
            id="IN-AN"
            fill={getStateColor('IN-AN')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-AN')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-AN', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 239.69,615.56347 -0.836,-0.0544 -0.215,0.78686 0.801,0.21258 0.25,-0.94504 z m 1.325,-2.24369 -0.296,1.04477 0.54,0.49569 0.459,-0.62162 -0.703,-0.91884 z m -0.906,-3.53022 -0.527,0.84428 0.463,0.28713 0.771,-0.54808 -0.707,-0.58333 z m 5.123,-5.45174 0.258,0.79391 0.515,0.17531 0.051,-1.09918 -0.824,0.13096 z m -6.003,-1.20295 0.516,0.48762 0.455,-0.13197 -0.149,-0.71129 -0.822,0.35564 z m 9.088,-1.01354 -1.004,0.26598 -0.243,0.75966 0.671,0.68409 0.954,-0.57025 -0.378,-1.14048 z m -7.089,-1.40848 0.353,0.55111 0.538,-0.0705 -0.891,-0.48057 z m 4.898,-0.3365 -0.73,0.60651 0.423,0.82817 0.736,-0.7657 -0.429,-0.66898 z m -1.999,-1.22411 0.251,1.23821 0.651,-0.18336 -0.29,-0.82111 -0.612,-0.23374 z m 5.193,-0.0484 -0.371,0.35967 0.354,0.96216 0.507,-0.53498 -0.49,-0.78685 z m -2.686,-1.4115 0.33,0.72741 0.423,-0.15717 -0.258,-0.73648 -0.495,0.16624 z m -4.035,-1.7198 0.515,0.48158 0.307,-0.36572 -0.822,-0.11586 z m 4.632,0.007 -0.292,0.73245 0.624,0.55413 0.223,-0.66193 -0.555,-0.62465 z m -2.089,-1.04274 0.242,0.5652 0.584,-0.19042 -0.826,-0.375 z m 5.652,-2.53184 -0.245,0.56521 0.439,0.44128 0.355,-0.5652 -0.549,-0.44129 z"
          />
          
          {/* Andhra Pradesh */}
          <path
            id="IN-AP"
            fill={getStateColor('IN-AP')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-AP')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-AP', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 316.48,584.94247 0.793,0.007 -0.091,-1.13848 -1.719,-0.64076 -0.486,-1.16064 0.877,0.18135 -0.285,-0.93193 1.078,0.42113 0.377,-0.403 1.112,0.21762 0,0 -0.343,-8.09121 -1.698,-4.46623 0.907,-5.23496 0,0 -0.39,-0.68308 -0.62,0.33852 -0.049,-0.77275 -0.963,0.47655 -0.937,-0.58637 0.499,-0.83622 0.681,0.63674 0.199,-0.35464 -0.395,-0.79592 -0.583,-0.16826 0.437,-0.75965 -1.144,-0.30527 0,0 0,0 0,0 0.725,-0.70626 0.561,0.89768 0.604,-0.36269 0.375,0.31736 -0.772,0.25792 0.444,1.28959 1.277,-1.20698 0.832,0.49267 0,0 0.988,-2.66382 5.699,-8.68463 2.047,-6.72907 0.924,-7.65899 0.959,-2.88144 -0.687,-3.21392 0,0 0.001,1.1425 -0.756,-0.42516 -0.956,-1.89007 -1.638,-0.0433 -1.73,-1.26642 -1.577,0.17228 -0.083,0.42113 0.891,0.17833 0.069,0.37378 -0.631,-0.0705 -0.22,0.60953 -0.702,0.17632 0.029,0.71935 -0.644,0.29217 0.441,0.65085 -0.587,0.82111 -1.556,0.70021 -1.065,-0.0191 -0.429,0.47957 -0.538,-0.44632 -0.687,0.6579 1.332,1.04981 -0.848,0.61457 -0.451,-0.57931 -0.714,0.31132 0.153,-0.57025 -0.476,0.0957 -0.1,-1.12941 -1.848,0.78686 -0.66,-0.46849 -0.271,-0.94604 -2.238,-0.27001 -1.136,0.44229 1.056,0.46748 -0.297,1.49009 0.529,-0.38083 0.197,0.28109 -0.5,0.17732 0.045,0.45337 -1.591,0.52491 0.142,0.71633 -0.976,0.70625 -0.849,-0.95309 -1.027,0.12191 -0.001,0.68107 -0.615,0.41508 -0.758,1.66338 -1.751,-0.14709 -1.873,-1.34098 -1.365,0.1884 -0.438,0.70223 0.653,0.35463 -0.895,-0.0232 -0.123,-1.42964 -2.722,0.87753 -0.912,-0.23071 -0.182,1.11328 -0.893,-0.29117 -0.784,0.83925 0.691,1.28657 -0.439,-0.004 -0.916,3.18974 -0.762,0.57729 0.044,1.25333 -0.487,0.12694 -0.176,-0.51281 -0.114,0.0373 -0.358,-0.0363 -0.102,0.86241 -0.647,0.0222 0.041,0.96317 -1.911,0.11989 -1.63,-0.88257 -0.545,-0.83622 1.561,0.22669 0.782,-0.72742 -0.137,-0.80398 0,0 0.028,0.77175 -0.937,0.0191 -0.626,0.84932 -1.093,0.39393 -0.564,-0.61054 -0.946,0.60853 0.3,2.24067 0.794,-0.31837 0.897,0.63875 0.268,-0.30023 1.606,0.53699 0.795,1.1153 1.279,0.74253 0.601,-0.10579 0.042,1.26642 -1.963,1.32285 0.133,1.07399 0.73,-0.48259 2.834,0.36572 1.547,-0.97626 0.599,0.48057 -0.72,1.37423 0.996,0.49569 -0.034,1.57572 1.159,0.10881 -1.799,0.23475 -1.201,2.28802 3.525,1.33091 0.479,1.15459 1.002,0.16624 0.193,0.62061 -0.879,2.03616 0.358,0.97727 -1.416,0.0655 0.518,0.88056 -0.469,3.62598 0.67,1.17675 -0.412,1.37222 0.395,0.37478 0.539,-0.26497 -0.042,0.48965 0.904,0.9007 1.367,0.34355 1.418,-0.84125 0.279,-0.79492 2.326,-1.29463 1.239,0.12795 -0.16,0.73446 0.755,1.10926 -0.084,0.70525 0.71,0.28411 -0.433,1.87596 -1.507,0.56621 1.262,1.53845 0.229,1.42259 -0.509,0.22467 -0.745,1.63416 0.514,0.36068 -0.309,0.73346 0.524,0.55312 -0.506,0.18336 -0.033,1.23821 -0.383,0.13098 -0.796,2.32832 0.922,0.0393 1.237,0.8332 1.032,-0.59644 0.429,0.63371 0.337,-0.67703 0.202,1.46087 0.957,0.6317 -0.37,0.97324 -0.928,0.41811 -0.48,2.19131 -0.569,0.0101 -0.362,0.77577 0,1.74197 -0.632,0.62968 0.317,0.76771 -1.17,1.15762 -0.288,1.1022 -1.045,0.5239 1.005,1.37523 0.005,0.66293 0.508,-0.0353 0.801,1.23318 -0.593,1.77118 -0.798,0.86342 -0.444,-0.0544 2.299,4.24055 -0.369,0.76469 -1.278,0.16926 0.481,1.17877 -1.563,1.25333 0.52,1.39941 -0.79,-0.22165 -0.533,0.52692 0,0 4.595,3.7489 4.919,0.94 0.518,-1.25132 3.582,-0.88156 1.198,-1.50016 5.506,-2.5933 -0.366,-0.20553 0.325,-0.83521 1.367,-1.63618 0.174,-1.94245 -0.884,0.15919 0.175,-1.49009 1.349,-1.96059 1.273,-0.0997 -0.901,-0.58939 -0.622,0.10579 0.238,-2.34445 0.844,-1.63718 4.221,-3.23608 3.506,-0.41207 1.657,-0.56017 -0.314,-0.34254 0.326,-0.39595 1.268,0.0473 0.192,-0.39494 3.047,-1.01455 1.715,-0.3365 2.902,0.26598 2.023,-0.46043 -2.657,-0.39997 -2.599,-2.24672 -0.861,-1.57069 0.762,-2.70815 1.244,-2.14295 2.675,-3.10712 0.697,-1.65431 2.35,-2.24571 -0.814,-1.15258 0.012,-1.11227 1.378,-2.47844 1.901,-1.1949 7.478,0.88761 1.942,-0.006 0.913,-0.44934 -0.587,-11.02403 z"
          />
          
          {/* Maharashtra */}
          <path
            id="IN-MH"
            fill={getStateColor('IN-MH')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-MH')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-MH', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 158.254,420.87947 2.748,1.35909 0.425,1.10623 2.081,-0.59845 1.378,1.50923 0.758,0.0272 0.304,1.23821 0.692,0.57931 0.438,-0.15313 0.463,0.95511 1.025,0.15917 0.463,1.48808 1.325,0.10982 -0.188,0.86746 0.681,0.5984 -0.064,1.4266 0.825,0.20654 0.146,2.35854 0.663,1.09112 0.451,-0.47554 0.669,0.26396 0.5,1.60394 0.606,0.18538 0.825,1.04981 0.875,0.36673 0.45,1.76817 1.088,-0.11486 1.563,1.89409 0.9,-0.42819 1.65,1.20597 1.3,0.15112 2.063,1.31377 0.6,1.09717 2.106,-0.31132 2.806,0.6579 0.325,1.71073 1.712,0.11486 1.4,1.09918 1.513,0.17027 0.213,0.80902 1.9,0.49267 0.913,1.88805 0.775,0.22769 1.05,1.08608 1.481,0.28612 1.325,1.24628 0.525,1.51628 0.85,0.26295 0.681,1.30171 0.963,0.58737 0.275,1.22612 1.806,-0.35262 0.35,0.67502 0.881,0.09979 1.494,1.45785 1.463,0.31132 0.425,0.82313 0.969,0.22266 0.744,0.99138 1.475,0.39192 1.444,1.57069 1.125,0.003 0.813,1.14754 0.256,1.5495 1.163,0.85738 0.994,0.28915 0.219,1.04477 1.756,0.50677 0.681,0.87652 0.775,-0.17329 1.275,0.5511 0.569,1.0075 1.013,0.16523 -0.013,1.1294 1.494,2.35149 1.863,0.49871 1.344,1.33998 0.406,1.38934 1.225,0.41912 0.3,1.18181 1.194,1.72787 0.956,0.13198 1.138,1.23922 0.731,0.0907 0.956,1.27851 0.6,0.14709 0.188,1.51628 0.788,0.54808 0.069,0.93092 1.238,1.30673 -0.031,0.98131 0.675,0.51282 0.425,1.1969 0.831,0.52088 0.119,0.64883 1.181,1.22612 1.131,2.55602 0.594,3.80637 0.781,0.86141 0.163,1.17374 0.544,0.35162 0.088,1.9898 0.719,0.68107 -0.263,1.29765 0.644,0.87954 0.931,0.8191 0.494,1.38431 0.575,0.24684 -0.019,1.37423 1.4,1.36616 -0.05,0.82715 0.513,0.86746 1.106,0.87954 0.663,1.8548 0.613,0.42516 0.231,1.36214 1.444,0.76671 0.544,0.80902 0.65,0.14811 1.081,1.35104 0.969,0.3768 0.413,1.08205 0.356,2.60941 0.631,0.97324 -0.444,1.84674 0.769,0.27103 -0.063,2.81494 -1.306,0.80096 -1.044,0.25187 -1.375,1.76413 -1.394,0.91179 -2.469,1.37926 -1.744,0.39594 -0.856,1.22914 -2.444,1.36819"
          />
          
          {/* Karnataka */}
          <path
            id="IN-KA"
            fill={getStateColor('IN-KA')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-KA')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-KA', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 108.774,553.18947 1.294,0.45136 1.426,2.17822 0.831,0.0363 0.125,0.62364 1.169,0.42617 1.712,-0.21057 0.194,0.50375 1.431,0.19243 0.306,1.03167 0.9,0.10378 0.362,1.19286 0.794,0.0393 1.05,1.32486 0.831,0.0544 0.569,0.86544 0.775,-0.0393 1.688,0.83925 0.644,0.0262 0.731,1.34501 0.9,0.0252 0.906,1.07097 0.669,0.0151 1.025,1.29966 0.45,0.0302 0.538,0.98634 0.9,0.0776 0.8,1.4559 0.825,0.0766 0.756,1.29765 0.619,0.003 0.763,1.44273 0.844,0.21661 0.631,1.35508 0.675,0.0554 0.744,1.42661 1,0.25792 0.644,1.34703 0.788,0.17127 0.906,1.63315 0.331,1.3964 1.519,1.75505 1.706,0.5652 0.638,1.26642 0.938,0.11284 0.556,1.37926 1.744,0.39594 2.469,-1.37926 1.394,-0.91179 1.375,-1.76413 1.044,-0.25187 1.306,-0.80096 0.063,-2.81494 -0.769,-0.27103 0.444,-1.84674 -0.631,-0.97324 -0.356,-2.60941 -0.413,-1.08205 -0.969,-0.3768 -1.081,-1.35104 -0.65,-0.14811 -0.544,-0.80902 -1.444,-0.76671 -0.231,-1.36214 -0.613,-0.42516 -0.663,-1.8548 -1.106,-0.87954 -0.513,-0.86746 0.05,-0.82715 -1.4,-1.36616 0.019,-1.37423 -0.575,-0.24684 -0.494,-1.38431 -0.931,-0.8191 -0.644,-0.87954 0.263,-1.29765 -0.719,-0.68107 -0.088,-1.9898 -0.544,-0.35162 -0.163,-1.17374 -0.781,-0.86141 -0.594,-3.80637 -1.131,-2.55602 -1.181,-1.22612 -0.119,-0.64883 -0.831,-0.52088 -0.425,-1.1969 -0.675,-0.51282 0.031,-0.98131 -1.238,-1.30673 -0.069,-0.93092 -0.788,-0.54808 -0.188,-1.51628 -0.6,-0.14709 -0.956,-1.27851 -0.731,-0.0907 -1.138,-1.23922 -0.956,-0.13198 -1.194,-1.72787 -0.3,-1.18181 -1.225,-0.41912 -0.406,-1.38934 -1.344,-1.33998 -1.863,-0.49871 -1.494,-2.35149 0.013,-1.1294 -1.013,-0.16523 -0.569,-1.0075 -1.275,-0.5511 -0.775,0.17329 -0.681,-0.87652 -1.756,-0.50677 -0.219,-1.04477 -0.994,-0.28915 -1.163,-0.85738 -0.256,-1.5495 -0.813,-1.14754 -1.125,-0.003 -1.444,-1.57069 -1.475,-0.39192 -0.744,-0.99138 -0.969,-0.22266 -0.425,-0.82313 -1.463,-0.31132 -1.494,-1.45785 -0.881,-0.09979 -0.35,-0.67502 -1.806,0.35262 -0.275,-1.22612 -0.963,-0.58737 -0.681,-1.30171 -0.85,-0.26295 -0.525,-1.51628 -1.325,-1.24628 -1.481,-0.28612 -1.05,-1.08608 -0.775,-0.22769 -0.913,-1.88805 -1.9,-0.49267 -0.213,-0.80902 -1.513,-0.17027 -1.4,-1.09918 -1.712,-0.11486 -0.325,-1.71073 -2.806,-0.6579 -2.106,0.31132 -0.6,-1.09717 -2.063,-1.31377 -1.3,-0.15112 -1.65,-1.20597 -0.9,0.42819 -1.563,-1.89409 -1.088,0.11486 -0.45,-1.76817 -0.875,-0.36673 -0.825,-1.04981 -0.606,-0.18538 -0.5,-1.60394 -0.669,-0.26396 -0.451,0.47554 -0.663,-1.09112 -0.146,-2.35854 -0.825,-0.20654 0.064,-1.4266 -0.681,-0.5984 0.188,-0.86746 -1.325,-0.10982 -0.463,-1.48808 -1.025,-0.15917 -0.463,-0.95511 -0.438,0.15313 -0.692,-0.57931 -0.304,-1.23821 -0.758,-0.0272 -1.378,-1.50923 -2.081,0.59845 -0.425,-1.10623 -2.748,-1.35909"
          />
          
          {/* Add more states as needed - using simplified paths for now */}
        </svg>

        {/* Tooltip */}
        {tooltip.visible && hoveredState && (
          <div
            className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px'
            }}
          >
            {indiaStatesData[hoveredState as keyof typeof indiaStatesData]?.name}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center mt-8 max-w-2xl mx-auto">
        <p className="text-lg text-stone-600 mb-4">
          🎭 Discover the artistic heritage of each Indian state
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-stone-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-orange-200 rounded"></div>
            <span>Hover to preview</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span>Click to explore</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🎨</span>
            <span>Rich art forms</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>📚</span>
            <span>Cultural stories</span>
          </div>
        </div>
      </div>

      {/* Modal for State Details */}
      {selectedState && selectedStateData && (
        <div className="state-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h2>{selectedStateData.name}</h2>
              <div className="capital">Capital: {selectedStateData.capital}</div>
              <button 
                className="close-button"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className="decorative-border"></div>

            {/* Body */}
            <div className="modal-body">
              {/* State Story */}
              <div className="state-story">
                <h3 className="text-xl font-bold mb-3 text-orange-700">📖 Cultural Heritage</h3>
                <p>{selectedStateData.story}</p>
              </div>

              {/* Art Forms */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center text-orange-700">
                  🎨 Traditional Art Forms
                </h3>
                <div className="artforms-grid">
                  {selectedStateData.artforms.map((artform, index) => (
                    <div key={index} className="artform-card">
                      <img 
                        src={artform.image} 
                        alt={artform.name}
                        className="artform-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="artform-content">
                        <h4 className="artform-name">{artform.name}</h4>
                        <p className="artform-description">{artform.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-orange-800">
                  🛍️ Support Local Artists
                </h4>
                <p className="text-stone-700 mb-4">
                  Discover and purchase authentic {selectedStateData.name} art pieces in our marketplace. 
                  Every purchase directly supports local artisans and helps preserve these traditional crafts.
                </p>
                <div className="flex gap-3">
                  <button 
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => {
                      closeModal();
                      // Navigate to marketplace with state filter
                      window.location.href = `/marketplace?state=${selectedState}`;
                    }}
                  >
                    Browse {selectedStateData.name} Art
                  </button>
                  <button 
                    className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                    onClick={closeModal}
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
