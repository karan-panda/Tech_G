"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import EmbedWidget from '@/components/EmbedWidget'; // Import EmbedWidget
import EmbedInsta from '@/components/EmbedInsta';
import EmbedLinkedin from '@/components/EmbedLinkedin';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Button variant="solid" className="bg-[#17a19a] hover:bg-[#138f85] text-white">Create</Button>
              <Button variant="outline" className="text-[#17a19a] border-[#17a19a] hover:bg-[#f1f8f7]">View Calendar</Button>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-[#17a191] text-white hover:bg-[#138f84]">Recent Post</Button>
              <Button variant="ghost" className="bg-cyan-100 hover:bg-cyan-200">Scheduled Post</Button>
            </div>
          </div>

          {/* EmbedWidget Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <EmbedWidget />
            </div>
            <div className="col-span-1">
              <EmbedInsta />
            </div>
            <div className="col-span-1">
              <EmbedLinkedin />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Analytics Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Analytics</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center">
                <FaInstagram className="text-pink-500 mr-2" /> Instagram: +2.01%
              </li>
              <li className="flex items-center">
                <FaFacebook className="text-blue-600 mr-2" /> Facebook: +2.01%
              </li>
              <li className="flex items-center">
                <FaTwitter className="text-sky-400 mr-2" /> Twitter: +2.01%
              </li>
              <li className="flex items-center">
                <FaLinkedin className="text-blue-500 mr-2" /> LinkedIn: +2.01%
              </li>
            </ul>
          </div>

          {/* Today's Activity Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Today's Activity</h3>
            <p className="text-sm text-gray-600">📅 Scheduled Posts: <span className="font-semibold">4</span></p>
            <p className="text-sm text-gray-600">✅ Published Posts: <span className="font-semibold">2</span></p>
          </div>

          {/* Help Section */}
          <section className="bg-[#17a19a] text-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
      <p className="text-sm mb-4">
        📧 Mail Us:{" "}
        <a href="mailto:support@example.com" className="text-blue-100 underline">
          support@example.com
        </a>
      </p>
      <Button
        variant="link"
        className="bg-white text-[#17a19a] hover:bg-[#f1f8f7]"
        onClick={() => window.open("/help", "_blank")}
      >
        Help Center
      </Button>
    </section>
        </div>
      </div>
    </div>
  );
}
