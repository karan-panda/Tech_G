"use client"

import { useState } from "react";
import { Trash2 } from 'lucide-react'
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ChevronLeft, ChevronRight, Moon, Plus, Sun, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventModal } from "./event-modal";
import { CalendarHeader } from "./calendar-header";
import { useCalendar } from "@/hooks/use-calendar";
import { useTheme } from "@/providers/theme-provider";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CATEGORY_COLORS = {
  work: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
  personal: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  family: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
  other: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};
const handleReset = () => {
  setEvents([])
  setShowResetConfirm(false)
}
export function Calendar() {
  const {
    currentDate,
    selectedDate,
    searchTerm,
    categoryFilter,
    setSelectedDate,
    setSearchTerm,
    setCategoryFilter,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    moveEvent,
    navigateMonth,
    resetAllEvents,  // Assuming you have a resetAllEvents method in useCalendar
  } = useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);  // State for warning modal
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const { theme, toggleTheme } = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDay: firstDay.getDay() };
  };
 

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    moveEvent(active.id, new Date(over.id));
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDay }, (_, i) => i);

  const handleResetClick = () => {
    setIsWarningModalOpen(true);
  };

  const handleResetConfirmation = () => {
    resetAllEvents(); // Call the resetAllEvents function to reset all events
    setIsWarningModalOpen(false); // Close the warning modal
  };

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
      <Card className="p-4 max-w-7xl mx-auto dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
  <Button
    variant="outline"
    size="icon"
    onClick={toggleTheme}
  >
    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
  </Button>
  <Button onClick={() => {
    setSelectedEvent(undefined)
    setIsModalOpen(true)
  }}>
    <Plus className="h-4 w-4 mr-2" />
    Create Post
  </Button>
  <Button variant="destructive" onClick={() => setShowResetConfirm(true)}>
    <Trash2 className="h-4 w-4 mr-2" />
    Reset
  </Button>
</div>
        </div>

        <CalendarHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} categoryFilter={categoryFilter} onCategoryChange={setCategoryFilter} />

        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center p-2 bg-muted font-medium text-sm">{day.slice(0, 3)}</div>
          ))}
          {blanks.map((blank) => <div key={`blank-${blank}`} className="p-2" />)}
          {days.map((day) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const events = getEventsForDate(date);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();
            return (
              <div key={date.toISOString()} id={date.toISOString()} className={`min-h-[120px] p-2 border border-border rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-primary/10" : ""}`} onClick={() => { setSelectedDate(date); setSelectedEvent(undefined); setIsModalOpen(true); }}>
                <div className="flex justify-between items-start">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${isToday ? "bg-primary text-primary-foreground" : ""}`}>{day}</span>
                </div>
                <div className="mt-1 space-y-1">
                  {events.map((event) => (
                    <div key={event.id} className={`text-xs p-1.5 rounded ${CATEGORY_COLORS[event.category]} cursor-pointer`} onClick={(e) => handleEventClick(event, e)}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{event.title}</span>
                      </div>
                      <div className="text-xs opacity-75">{event.startTime} - {event.endTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <EventModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedEvent(undefined); }} event={selectedEvent} selectedDate={selectedDate} onSubmit={selectedEvent ? (eventData) => updateEvent(selectedEvent.id, eventData) : addEvent} onDelete={selectedEvent ? (id) => deleteEvent(id) : undefined} />
      </Card>

      {/* Warning Modal */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Are you sure you want to reset all the scheduled posts?</h2>
            <p className="mb-4 text-sm">This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsWarningModalOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleResetConfirmation}>Reset</Button>
            </div>
          </div>
        </div>
      )}
      <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Reset Calendar</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to reset the calendar? This will delete all your scheduled posts.</p>
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleReset}>
        Reset
      </Button>
    </div>
  </DialogContent>
</Dialog>
    </DndContext>
  );
}
