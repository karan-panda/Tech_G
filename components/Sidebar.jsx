"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Calendar,
  Users,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { FaReddit, FaXTwitter, FaPinterest } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
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
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white text-black transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <span className={`font-bold text-xl ${!isOpen ? "hidden" : "block"}`}>
            Logo
          </span>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-[#148A7E] focus:outline-none focus:ring-2 focus:ring-[#17A191] transition-colors"
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        <nav className="flex-grow">
          {menuItems.map((item) => (
            <div key={item.name}>
              <button
                className={`flex items-center w-full p-4 hover:bg-[#148A7E] transition-colors ${
                  activeMenu === item.name ? "bg-[#17A191]" : ""
                }`}
                onClick={() => toggleMenu(item.name)}
              >
                <item.icon size={20} />
                {isOpen && (
                  <>
                    <span className="ml-4 flex-grow text-left">
                      {item.name}
                    </span>
                    {item.sub && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>
              {item.sub && activeMenu === item.name && isOpen && (
                <div className="bg-[#148A7E] py-2">
                  {item.sub.map((subItem) => (
                    <button
                      key={subItem.name}
                      className="flex items-center w-full pl-12 pr-4 py-2 hover:bg-[#17A191] transition-colors"
                    >
                      <subItem.icon size={16} />
                      <span className="ml-4">{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 space-y-2">
          <button className="flex items-center w-full p-2 rounded hover:bg-[#148A7E] transition-colors">
            <Plus size={20} />
            {isOpen && <span className="ml-4">Create Post</span>}
          </button>
          <button className="flex items-center w-full p-2 rounded hover:bg-[#148A7E] transition-colors">
            <Settings size={20} />
            {isOpen && <span className="ml-4">Settings</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;