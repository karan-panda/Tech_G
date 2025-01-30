"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";
import Landing from "@/app/page";
import {
  Home,
  Calendar,
  Users,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sprout
} from "lucide-react";
import { FaReddit, FaXTwitter, FaPinterest } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname(); // Get current path

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Scheduler", icon: Calendar, path: "/calendar" },
    {
      name: "Social Media",
      icon: Users,
      sub: [
        { name: "Instagram", icon: Instagram, path: "https://www.instagram.com/adi.tya_p/" },
        { name: "Twitter", icon: FaXTwitter, path: "https://x.com/KaranPanda_" },
        { name: "Linkedin", icon: Linkedin, path: "https://www.linkedin.com/in/aditya-palande-573b292a9/" },
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
            <Link href="/">
              <div className="flex items-end space-x-2">
                <Sprout className="h-8 w-8 text-green-600" />
                <div className="text-l font-bold text-gray-800">SocialSprout</div>
              </div>
            </Link>
            
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
              {item.sub ? (
                <>
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
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            activeMenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                  {activeMenu === item.name && isOpen && (
                    <div className="white py-2">
                      {item.sub.map((subItem) => (
                        <Link key={subItem.name} href={subItem.path} target="_blank">
                          <button
                            className={`flex items-center w-full pl-12 pr-4 py-2 hover:bg-[#17A191]  transition-colors ${
                              pathname === subItem.path ? "bg-[#caf2f2]" : ""
                            }`}
                          >
                            <subItem.icon size={16} />
                            <span className="ml-4">{subItem.name}</span>
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.path}>
                  <button
                    className={`flex items-center w-full p-4 hover:bg-[#148A7E] transition-colors ${
                      pathname === item.path ? "bg-[#17A191]" : ""
                    }`}
                  >
                    <item.icon size={20} />
                    {isOpen && <span className="ml-4">{item.name}</span>}
                  </button>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 space-y-2">
          <Link href="/home">
            <button className="flex items-center w-full p-2 rounded hover:bg-[#148A7E] transition-colors">
              <Plus size={20} />
              {isOpen && <span className="ml-4">Create Post</span>}
            </button>
          </Link>
          <Link href="/settings">
            <button className="flex items-center w-full p-2 rounded hover:bg-[#148A7E] transition-colors">
              <Settings size={20} />
              {isOpen && <span className="ml-4">Settings</span>}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
