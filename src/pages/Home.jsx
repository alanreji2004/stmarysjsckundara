import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative w-full overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow pt-24 relative flex items-center justify-center min-h-[100vh]">
        {/* Background Image Container */}
        {/* NOTE: Place your image inside src/assets and name it background.jpg, or adjust the path below */}
        <div className="absolute inset-0 top-24 z-0 bg-gray-900">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ 
              backgroundImage: "url('/src/assets/background.jpg')",
            }}
          />
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-[-4rem]">
          <span 
            className="text-[#d49a42] font-semibold tracking-[0.2em] uppercase text-sm md:text-base mb-4 animate-fade-in inline-block" 
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Welcome to
          </span>
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white mb-6 leading-tight animate-fade-in drop-shadow-xl" 
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            St. Mary's Jacobite Syrian Cathedral
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto animate-fade-in font-light leading-relaxed drop-shadow-md" 
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Experience the divine grace and witness a heritage of faith in Kundara. Join our community in prayer, peace, and spiritual growth.
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-fade-in w-full sm:w-auto mt-4" 
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <button className="bg-[#d49a42] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#c38a36] hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center gap-2">
              Join Our Prayers
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Virtual Tour
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
