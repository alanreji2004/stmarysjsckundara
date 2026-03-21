import React, { useState } from 'react';
import { ChevronDown, Send, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.webp';

const NavItem = ({ title, hasDropdown }) => (
  <div className="flex items-center gap-1.5 cursor-pointer text-white hover:text-[#d49a42] transition-colors text-sm font-medium tracking-wide">
    {title}
    {hasDropdown && <ChevronDown size={14} className="text-white/70 mt-0.5" />}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute w-full top-0 z-50 backdrop-blur-sm shadow-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-sm">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=St+Marys&background=f3f4f6&color=6b7280";
                }}
              />
            </div>
            <div className="flex flex-col justify-center translate-y-0.5">
              <span className="font-bold text-lg sm:text-xl md:text-[22px] text-[white] tracking-tight leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                ST. MARY'S
              </span>
              <span className="font-semibold text-[8px] sm:text-[10px] md:text-[11px] text-white/90 uppercase tracking-wider mt-1 sm:mt-1.5 leading-none">
                Jacobite Syrian Cathedral
              </span>
              <div className="flex items-center justify-center mt-1 sm:mt-1.5 w-full gap-2">
                <div className="h-[1px] bg-white/40 flex-grow"></div>
                <span className="font-medium text-[7px] sm:text-[9px] md:text-[10px] text-white/70 uppercase tracking-[0.25em] leading-none">
                  Kundara
                </span>
                <div className="h-[1px] bg-white/40 flex-grow"></div>
              </div>
            </div>
          </Link>
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-8 mx-4">
            <NavItem title="Home" />
            <NavItem title="About" hasDropdown />
            <NavItem title="Vows&Offerings" hasDropdown />
            <NavItem title="Administration" />
            <NavItem title="Gallery" hasDropdown />
            <NavItem title="Institutions" hasDropdown />
            <NavItem title="Live Streaming" hasDropdown />
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="hidden md:flex bg-[#d49a42] hover:bg-[#c38a36] text-white px-6 py-2.5 rounded-full items-center gap-2.5 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group">
              <span className="text-sm tracking-wide">Contact</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button 
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 py-6 px-6 flex flex-col gap-5 shadow-2xl">
          <NavItem title="Home" />
          <NavItem title="About" hasDropdown />
          <NavItem title="Vows&Offerings" hasDropdown />
          <NavItem title="Administration" />
          <NavItem title="Gallery" hasDropdown />
          <NavItem title="Institutions" hasDropdown />
          <NavItem title="Live Streaming" hasDropdown />
          <button className="w-full mt-2 bg-[#d49a42] hover:bg-[#c38a36] text-white py-3 rounded-full flex justify-center items-center gap-2 font-semibold transition-colors">
            Contact <Send size={16} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
