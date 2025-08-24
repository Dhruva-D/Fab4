import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtOfTheWeekFeatured: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/art-of-the-week');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🎨 Art of the Week
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover traditional Indian craftsmanship and join our weekend workshops
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-4"></div>
        </div>

        <div 
          onClick={handleViewMore}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] group"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Art Image */}
            <div className="relative overflow-hidden">
              <div className="aspect-square lg:aspect-auto lg:h-full bg-gradient-to-br from-amber-100 to-orange-200">
                <img 
                  src="https://media.istockphoto.com/id/639487044/photo/hands-of-a-potter-creating-an-earthen-jar.jpg?s=612x612&w=0&k=20&c=gCVqR1YvUT6qZhazjpNNGzlpgh_sQQJNzXNsh0ZZEh0=" 
                  alt="Traditional Indian Pottery"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-orange-600">Featured This Week</span>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
                    <span className="text-gray-800 font-semibold">Click to explore →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Artist Info */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    Traditional Pottery Making
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">RK</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Raj Kumar Kumhar</p>
                      <p className="text-sm text-gray-600">Master Potter • 25+ years experience</p>
                    </div>
                  </div>
                </div>

                {/* Brief Description */}
                <div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Discover the ancient art of Indian pottery, a 5000-year-old tradition. 
                    Join us for hands-on experience this weekend and create your own masterpiece.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">This Weekend</p>
                    <p className="text-sm text-gray-600">Aug 26, 10 AM - 4 PM</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Location</p>
                    <p className="text-sm text-gray-600">Fab4 Art Studio, Delhi</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {['#Pottery', '#Traditional', '#Weekend'].map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                    <span className="text-sm mr-2">Learn More</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* CTA Preview */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl text-white">
                  <p className="font-semibold text-sm mb-2">🎯 Weekend Workshop Available!</p>
                  <p className="text-xs opacity-90">Walk-in or register online • All materials included</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Call to Action */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Want to see more details about this week's featured art?</p>
          <button 
            onClick={handleViewMore}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View Complete Art Story →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtOfTheWeekFeatured;
