"use client";
import { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  Plus,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";
import { FaReddit, FaXTwitter, FaPinterest } from "react-icons/fa6";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-green-700"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen bg-[#3ca972] text-white flex flex-col p-4 fixed top-0 left-0 transition-all duration-300 md:relative
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0"} 
          ${open ? "w-64" : "w-20 items-center"}`}
      >
        <button onClick={() => setOpen(!open)} className="mb-6 text-xl font-bold hidden md:block">
          {open ? "⏪" : "⏩"}
        </button>

        <nav className="flex-1 space-y-4">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Scheduler", icon: Calendar },
            {
              name: "Social Media",
              icon: Users,
              sub: [
                { name: "Reddit", icon: FaReddit },
                { name: "Twitter", icon: FaXTwitter },
                { name: "Pinterest", icon: FaPinterest },
              ],
            },
          ].map((item) => (
            <div key={item.name}>
              <button
                className="flex items-center w-full p-2 rounded-lg hover:bg-green-600"
                onClick={() => toggleMenu(item.name)}
              >
                <item.icon className="w-5 h-5" />
                {open && <span className="ml-3 flex-1">{item.name}</span>}
                {open && item.sub && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeMenu === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {activeMenu === item.name && open && item.sub && (
                <div className="ml-6 space-y-2">
                  {item.sub.map(({ name, icon: Icon }) => (
                    <div key={name} className="flex items-center p-2 rounded-lg hover:bg-green-500">
                      <Icon className="w-4 h-4 mr-2" />
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-green-600">
            <Plus className="w-5 h-5" />
            {open && <span className="ml-3">Create Post</span>}
          </button>
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-green-600">
            <Settings className="w-5 h-5" />
            {open && <span className="ml-3">Settings</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
