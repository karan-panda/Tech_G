"use client"; 

import { useState } from "react";

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64">
      <p className="text-center text-gray-600">[Calendar Component]</p>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Replace with a real calendar logic */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="font-semibold text-sm">{day}</div>
        ))}
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(index + 1)}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
          >
            {index + 1}
          </div>
        ))}
      </div>
      {selectedDate && <p className="mt-4 text-center">Selected Date: {selectedDate}</p>}
    </div>
  );
}
