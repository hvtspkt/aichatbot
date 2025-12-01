import React from 'react';
import { FEATURES } from '../constants';
import { FeatureIcon } from '../types';

const FeatureGrid: React.FC = () => {
  const getIconClass = (iconName: FeatureIcon) => {
    switch (iconName) {
      case FeatureIcon.COMMENTS: return 'fa-comments text-blue-500';
      case FeatureIcon.BELL: return 'fa-bell text-yellow-500';
      case FeatureIcon.CHART: return 'fa-chart-simple text-green-500';
      default: return 'fa-star';
    }
  };

  return (
    <section className="py-8 bg-white rounded-xl shadow-sm mb-8 px-4 md:px-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wide">
          Các chức năng nổi bật của Chatbot
        </h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100 group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
              <i className={`fa-solid ${getIconClass(feature.icon)} text-3xl`}></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
