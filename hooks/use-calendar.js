"use client"

import { useState, useEffect } from "react"
import { NotificationService } from "@/services/notifications"

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendar-events")
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents).map((event) => ({
        ...event,
        date: new Date(event.date),
      }))
      setEvents(parsedEvents)
      scheduleNotifications(parsedEvents)
    }
  }, [])

  // Save events to localStorage when they change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events))
    scheduleNotifications(events)
  }, [events])

  const scheduleNotifications = (events) => {
    events.forEach((event) => {
      event.reminders.forEach((reminder) => {
        NotificationService.scheduleNotification(event, reminder.time)
      })
    })
  }

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: self.crypto.randomUUID(),
    }

    if (event.recurrence.pattern !== "none") {
      const recurringEvents = generateRecurringEvents(newEvent)
      setEvents((prev) => [...prev, ...recurringEvents])
    } else {
      setEvents((prev) => [...prev, newEvent])
    }
  }

  const generateRecurringEvents = (event) => {
    const events = [event]
    const endDate = event.recurrence.endDate || new Date(event.date.getTime() + 30 * 24 * 60 * 60 * 1000)
    let currentDate = new Date(event.date)

    while (currentDate <= endDate) {
      currentDate = getNextRecurringDate(currentDate, event.recurrence.pattern)
      if (currentDate <= endDate) {
        events.push({
          ...event,
          id: self.crypto.randomUUID(),
          date: new Date(currentDate),
          isRecurringInstance: true,
          parentEventId: event.id,
        })
      }
    }

    return events
  }

  const getNextRecurringDate = (date, pattern) => {
    const next = new Date(date)
    switch (pattern) {
      case "daily":
        next.setDate(date.getDate() + 1)
        break
      case "weekly":
        next.setDate(date.getDate() + 7)
        break
      case "monthly":
        next.setMonth(date.getMonth() + 1)
        break
      case "yearly":
        next.setFullYear(date.getFullYear() + 1)
        break
    }
    return next
  }

  const updateEvent = (id, updatedEvent) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)))
  }

  const deleteEvent = (id, deleteRecurring = false) => {
    setEvents((prev) => {
      const eventToDelete = prev.find((e) => e.id === id)
      if (!eventToDelete) return prev

      if (deleteRecurring && eventToDelete.parentEventId) {
        return prev.filter((e) => e.parentEventId !== eventToDelete.parentEventId)
      }

      return prev.filter((e) => e.id !== id)
    })
  }

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }
  const resetAllEvents = () => {
    setEvents([]);
  };

  const getFilteredEvents = () => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }

  const moveEvent = (id, newDate) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, date: newDate } : event)))
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return {
    currentDate,
    events,
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
    getFilteredEvents,
    moveEvent,
    navigateMonth,
    resetAllEvents,
  }
}
