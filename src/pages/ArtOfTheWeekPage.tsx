import React from 'react';

const ArtOfTheWeekPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              🎨 Art of the Week
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the beauty of traditional Indian craftsmanship and join us for an immersive weekend experience
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Art Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://media.istockphoto.com/id/639487044/photo/hands-of-a-potter-creating-an-earthen-jar.jpg?s=612x612&w=0&k=20&c=gCVqR1YvUT6qZhazjpNNGzlpgh_sQQJNzXNsh0ZZEh0=" 
                  alt="Traditional Indian Pottery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-orange-600">This Week's Feature</span>
                </div>
              </div>
              
              {/* Additional Images */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={`https://images.squarespace-cdn.com/content/v1/62a50dd4e7140553cb963f52/b4c43c9f-46b3-4b11-a67b-4b99fba41bae/02+Sailor+Ceramics+Handmade+Pottery-9793-THROWING.jpg`} 
                      alt={`Pottery process ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Artist Info */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Traditional Pottery Making</h2>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">RK</span>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Raj Kumar Kumhar</p>
                    <p className="text-gray-600">Master Potter • 25+ years experience</p>
                    <p className="text-sm text-gray-500 mt-1">Rajasthan, India</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">25+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">500+</p>
                    <p className="text-sm text-gray-600">Pieces Created</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">100+</p>
                    <p className="text-sm text-gray-600">Students Taught</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Art History Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">The Ancient Art of Indian Pottery</h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p className="mb-6">
                Traditional Indian pottery is an ancient craft dating back over 5000 years, deeply rooted in the cultural 
                heritage of the Indian subcontinent. This timeless art form has been passed down through generations, 
                preserving techniques and traditions that connect us to our ancestors.
              </p>
              <p className="mb-6">
                This week, we explore the beautiful art of terracotta pottery from Rajasthan, where skilled artisans 
                create stunning pieces using age-old techniques. The process involves selecting the finest clay, 
                hand-shaping each piece, and firing them in traditional kilns that have been used for centuries.
              </p>
              <p>
                Each piece tells a story - of the earth from which it came, the hands that shaped it, and the fire 
                that transformed it. Join us in celebrating this magnificent craft and learn to create your own 
                piece of history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Share the Beauty</h3>
              <p className="text-gray-600">Help us spread the love for traditional Indian art</p>
            </div>
            
            <div className="flex justify-center mb-8">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                📱 Share to Instagram Story
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {['#IndianPottery', '#TraditionalArt', '#Handmade', '#CulturalHeritage', '#ArtOfTheWeek', '#Pottery', '#Rajasthan', '#IndianCrafts', '#Terracotta', '#ArtisanMade'].map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-12 rounded-3xl text-white shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">🎯 Join Us This Weekend!</h3>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Experience the magic of pottery making with Master Raj Kumar! Get hands-on experience 
                and create your own masterpiece in our fully equipped studio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Date</h4>
                <p className="opacity-90">Saturday, Aug 26, 2025</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Time</h4>
                <p className="opacity-90">10:00 AM - 4:00 PM</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Venue</h4>
                <p className="opacity-90">Fab4 Art Studio, Pottery Wing, Delhi</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
              <button className="flex-1 bg-white text-orange-600 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-lg">
                🏃‍♂️ Walk-in Registration
              </button>
              <button className="flex-1 bg-yellow-400 text-gray-800 font-semibold py-4 px-8 rounded-2xl hover:bg-yellow-300 transition-colors text-lg">
                📝 Register Online Now
              </button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm opacity-80">
                🎁 All materials included • ☕ Refreshments provided • 🏆 Take home your creation
              </p>
              <p className="text-xs mt-2 opacity-70">
                Limited to 20 participants • Both online registration and walk-ins welcome
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtOfTheWeekPage;
