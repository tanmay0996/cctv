import { Home, Video, Layers, AlertCircle, Users, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-[#111111] to-[#D2AE48] flex items-center px-6 py-4">
      {/* Left avatar */}
      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden mr-4">
        <img
          src="/avatar1.jpg" // replace with actual image or avatar URL
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Name */}
      <div className="text-xl font-bold text-textPrimary mr-8">MANDLACX</div>

      {/* Nav Items */}
      <nav className="flex gap-6">
        <a className="flex items-center gap-1 text-accent font-medium">
          <Home size={16} /> Dashboard
        </a>
        <a className="flex items-center gap-1 text-textSecondary hover:text-textPrimary">
          <Video size={16} /> Cameras
        </a>
        <a className="flex items-center gap-1 text-textSecondary hover:text-textPrimary">
          <Layers size={16} /> Scenes
        </a>
        <a className="flex items-center gap-1 text-textSecondary hover:text-textPrimary">
          <AlertCircle size={16} /> Incidents
        </a>
        <a className="flex items-center gap-1 text-textSecondary hover:text-textPrimary">
          <Users size={16} /> Users
        </a>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Moon icon (Dark mode toggle placeholder) */}
      <div className="text-textSecondary mr-4">
        <Moon size={18} />
      </div>

      {/* Right avatars */}
      {/* <div className="flex items-center space-x-[-8px] mr-2">
        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-bold text-black border-2 border-black">V</div>
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-sm font-bold text-white border-2 border-black">S</div>
      </div> */}

      {/* Count badge */}
      <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center border border-white">
        O
      </div>
    </header>
  );
}
