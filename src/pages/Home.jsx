import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import bgImage from '../assets/background.webp';
import sunorImage from '../assets/sunoro.webp';

const RevealOnScroll = ({ children, delay = 0, type = 'slideUp', className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Define classes directly inside so they are parsed by Tailwind
    const animations = {
      slideUp: {
        visible: ['translate-y-0', 'opacity-100', 'scale-100', 'blur-0'],
        hidden: ['translate-y-16', 'opacity-0', 'scale-95', 'blur-[2px]']
      },
      zoomIn: {
        visible: ['scale-100', 'opacity-100', 'blur-0'],
        hidden: ['scale-90', 'opacity-0', 'blur-[4px]']
      },
      fade: {
        visible: ['opacity-100', 'blur-0'],
        hidden: ['opacity-0', 'blur-[4px]']
      }
    };

    const anim = animations[type] || animations.slideUp;

    // Apply initial hidden state
    ref.current.classList.add(...anim.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!ref.current) return;
        if (entry.isIntersecting) {
          ref.current.classList.remove(...anim.hidden);
          ref.current.classList.add(...anim.visible);
          ref.current.style.transitionDelay = `${delay}ms`;
        } else {
          ref.current.classList.remove(...anim.visible);
          ref.current.classList.add(...anim.hidden);
          ref.current.style.transitionDelay = '0ms';
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [type, delay]);

  return (
    <div
      ref={ref}
      style={{ willChange: 'transform, opacity, filter' }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform ${className}`}
    >
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-gray-900 flex flex-col w-full overflow-x-hidden selection:bg-[#d49a42]/30 selection:text-white">
      <Navbar />
      
      <main className="flex flex-col w-full relative">
        
        {/* --- Hero Section --- */}
        <section className="relative flex items-center justify-center min-h-screen w-full pt-16">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Subtle gradient to ensure navbar and text are readable without making the image dark */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 backdrop-blur-[1px]" />
          
          <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
            
            <RevealOnScroll delay={100} type="slideUp" className="w-full">
              <span className="text-[#d49a42] font-bold tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base mb-4 sm:mb-6 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] lg:mt-0 mt-8">
                Welcome to
              </span>
            </RevealOnScroll>
            
            <RevealOnScroll delay={250} type="zoomIn" className="w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif text-white mb-6 sm:mb-8 leading-[1.1] drop-shadow-2xl px-2">
                St. Mary's Jacobite
                <br className="hidden sm:block" /> Syrian Cathedral
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={400} type="slideUp" className="w-full">
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-12 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-light leading-relaxed drop-shadow-xl px-4">
                Experience the divine grace and witness a heritage of faith in Kundara. Join our community in prayer, peace, and spiritual growth.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={550} type="fade" className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0 justify-center">
              <button className="bg-[#d49a42] text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-[#c38a36] hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center text-sm sm:text-base outline-none ring-offset-2 ring-offset-gray-900 focus:ring-2 focus:ring-[#d49a42]">
                Join Our Prayers
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/30 hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center text-sm sm:text-base outline-none ring-offset-2 ring-offset-gray-900 focus:ring-2 focus:ring-white">
                Virtual Tour
              </button>
            </RevealOnScroll>
          </div>
        </section>

        {/* --- About Section --- */}
        <section className="relative flex items-center justify-center min-h-screen w-full py-24 sm:py-32 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${sunorImage})` }}
          />
          {/* Much lighter transparent overlay to reveal the natural beauty of the background image */}
          <div className="absolute inset-0 z-0 bg-black/30" />

          {/* Frosted glass content container for high contrast independent of the background */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-4 sm:px-6">
            
            <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
              <RevealOnScroll delay={100} type="slideUp">
                <span className="text-[#d49a42] font-bold tracking-[0.25em] uppercase text-xs sm:text-sm mb-4 block text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  A Legacy of Faith
                </span>
              </RevealOnScroll>
              
              <RevealOnScroll delay={300} type="zoomIn">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white relative flex flex-col items-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                  <span className="mb-2">About</span>
                  <div className="w-20 h-1.5 bg-[#d49a42] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform origin-center"></div>
                </h2>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={500} type="slideUp" className="w-full">
              <div className="w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-md group-hover:blur-xl transition-all duration-700"></div>
                <div className="relative bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group-hover:border-white/20 hover:bg-black/50 transition-all duration-500">
                  <p className="text-gray-100 text-lg sm:text-xl md:text-2xl font-light leading-[1.9] sm:leading-[2] text-center drop-shadow-md text-balance">
                    <span className="text-4xl sm:text-5xl text-[#d49a42] font-serif leading-none mr-2 align-top opacity-60"></span>
                    St. Mary's Jacobite Syrian Cathedral in Kundara stands as a prominent spiritual and historical landmark in the Kollam district of Kerala, tracing its roots back to its establishment in 1871. As a major center for the Jacobite Syrian Christian community, the cathedral is renowned for its striking architecture and its deep-seated traditions, most notably the celebration of the Nativity of St. Mary every September which draws faithful from across the region. Over the decades, it has grown from a local parish into a majestic cathedral, serving as a pillar of the Kollam Diocese and maintaining a vibrant presence through its various shrines and community outreach.
                    <span className="text-4xl sm:text-5xl text-[#d49a42] font-serif leading-none ml-2 align-bottom opacity-60"></span>
                  </p>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
