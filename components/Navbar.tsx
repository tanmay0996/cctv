import { Home, Video, Layers, AlertCircle, Users, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Video, label: "Cameras" },
    { icon: Layers, label: "Scenes" },
    { icon: AlertCircle, label: "Incidents" },
    { icon: Users, label: "Users" },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-[#111111] to-[#D2AE48] flex items-center px-4 sm:px-6 py-4 relative">
        {/* Left avatar */}
        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden mr-4">
          <img
            src="/avatar1.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Brand Name */}
        <div className="text-xl font-bold text-white mr-8">MANDLACX</div>

        {/* Desktop Nav Items - Hidden on mobile/tablet */}
        <nav className="hidden lg:flex gap-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              className={`flex items-center gap-1 font-medium ${
                item.active
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <item.icon size={16} /> {item.label}
            </a>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Right Side Items */}
        <div className="hidden lg:flex items-center">
          {/* Moon icon */}
          <div className="text-gray-300 mr-4 hover:text-white cursor-pointer">
            <Moon size={18} />
          </div>

          {/* Count badge */}
          <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center border border-white">
            O
          </div>
        </div>

        {/* Mobile/Tablet Right Side */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Moon icon */}
          <div className="text-gray-300 hover:text-white cursor-pointer">
            <Moon size={18} />
          </div>

          {/* Count badge */}
          <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center border border-white">
            O
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMenu}>
          <div 
            className="absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-gradient-to-b from-[#111111] to-[#1a1a1a] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="text-xl font-bold text-white">Menu</div>
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={toggleMenu}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      item.active
                        ? "bg-gray-800 bg-opacity-20 text-yellow-400"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Menu Footer */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-3 p-3 text-gray-300">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-600 overflow-hidden">
                    <img
                      src="/avatar1.jpg"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">User Profile</div>
                    <div className="text-sm text-gray-400">Settings & More</div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}