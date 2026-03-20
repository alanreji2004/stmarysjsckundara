import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavItem = ({ title, hasDropdown }) => (
  <div className="flex items-center gap-1 cursor-pointer hover:text-[#d49a42] transition-colors text-gray-700 font-medium text-[15px]">
    {title}
    {hasDropdown && <ChevronDown size={16} className="text-gray-400 mt-0.5" />}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 bg-white shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border shadow-sm">
              <img 
                src="/src/assets/logo.png" 
                alt="Church Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=St+Marys&background=f3f4f6&color=6b7280";
                }}
              />
            </div>
            <div className="flex flex-col justify-center translate-y-0.5">
              <span className="font-bold text-xl md:text-[22px] text-[#1a2530] tracking-tight leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                ST. MARY'S
              </span>
              <span className="font-semibold text-[10px] md:text-[11px] text-gray-700 uppercase tracking-wider mt-1 leading-none">
                Jacobite Syrian Cathedral
              </span>
              <div className="flex items-center justify-center mt-1 w-full gap-2">
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
                <span className="font-medium text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.25em] leading-none">
                  Kundara
                </span>
                <div className="h-[1px] bg-gray-300 flex-grow"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center xl:gap-8 gap-5 ml-4">
            <NavItem title="Home" />
            <NavItem title="About" hasDropdown />
            <NavItem title="Vows&Offerings" hasDropdown />
            <NavItem title="Administration" />
            <NavItem title="Gallery" hasDropdown />
            <NavItem title="Institutions" hasDropdown />
            <NavItem title="Live Streaming" hasDropdown />
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex bg-[#d49a42] text-white pl-5 pr-2 py-2 rounded-full items-center gap-3 font-semibold hover:bg-[#c38a36] hover:shadow-md transition-all group">
              <span className="text-[15px] pl-1">Contact</span>
              <div className="bg-white text-[#d49a42] p-1.5 rounded-full group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </button>
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <NavItem title="Home" />
          <NavItem title="About" hasDropdown />
          <NavItem title="Vows&Offerings" hasDropdown />
          <NavItem title="Administration" />
          <NavItem title="Gallery" hasDropdown />
          <NavItem title="Institutions" hasDropdown />
          <NavItem title="Live Streaming" hasDropdown />
          <button className="w-full mt-4 bg-[#d49a42] text-white py-3 rounded-full flex justify-center items-center gap-2 font-semibold">
            Contact <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
