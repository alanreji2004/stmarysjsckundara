import React from 'react';
import Navbar from '../components/Navbar';
import bgImage from '../assets/background.webp';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex items-center justify-center min-h-screen relative w-full pt-20">
        <div className="absolute inset-0 z-0 bg-gray-900">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${bgImage})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-[#d49a42] font-semibold tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base mb-4 sm:mb-6 animate-fade-in lg:mt-0 mt-8" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Welcome to
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif text-white mb-6 sm:mb-8 leading-[1.1] drop-shadow-xl px-2 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            St. Mary's Jacobite
            <br className="hidden sm:block" /> Syrian Cathedral
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-12 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md px-4 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            Experience the divine grace and witness a heritage of faith in Kundara. Join our prayers, peace, and spiritual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <button className="bg-[#d49a42] text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-[#c38a36] hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center text-sm sm:text-base outline-none ring-offset-2 ring-offset-gray-900 focus:ring-2 focus:ring-[#d49a42]">
              Join Our Prayers
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center text-sm sm:text-base outline-none ring-offset-2 ring-offset-gray-900 focus:ring-2 focus:ring-white">
              Virtual Tour
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
