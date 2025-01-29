"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { NotificationService } from "@/services/notifications"
import { FiLock } from "react-icons/fi" // Added lock icon from react-icons

const CATEGORIES = {
  work: { label: "Work", color: "#4f46e5" },
  personal: { label: "Personal", color: "#16a34a" },
  family: { label: "Family", color: "#db2777" },
  other: { label: "Other", color: "#71717a" },
}

const RECURRENCE_PATTERNS = {
  none: "No Recurrence",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
}

export function EventModal({ isOpen, onClose, onSubmit, onDelete, event, selectedDate }) {
  const [title, setTitle] = useState(event?.title ?? "")
  const [description, setDescription] = useState(event?.description ?? "")
  const [startTime, setStartTime] = useState(event?.startTime ?? "09:00")
  const [endTime, setEndTime] = useState(event?.endTime ?? "10:00")
  const [category, setCategory] = useState(event?.category ?? "other")
  const [isPrivate, setIsPrivate] = useState(event?.visibility === "private")
  const [recurrencePattern, setRecurrencePattern] = useState(event?.recurrence.pattern ?? "none")
  const [reminder, setReminder] = useState(event?.reminders[0]?.time ?? 15)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description ?? "")
      setStartTime(event.startTime)
      setEndTime(event.endTime)
      setCategory(event.category)
      setIsPrivate(event.visibility === "private")
      setRecurrencePattern(event.recurrence.pattern)
    }
  }, [event])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate) return

    const newEvent = {
      title,
      description,
      date: selectedDate,
      startTime,
      endTime,
      category,
      visibility: isPrivate ? "private" : "public",
      recurrence: {
        pattern: recurrencePattern,
        endDate: recurrencePattern !== "none" ? new Date(selectedDate.getTime() + 30 * 24 * 60 * 60 * 1000) : undefined,
      },
      reminders: reminder ? [{ id: self.crypto.randomUUID(), time: reminder, type: "notification" }] : [],
    }

    if (reminder) {
      await NotificationService.requestPermission()
    }

    onSubmit(newEvent)
    resetForm()
    onClose()
  }

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id)
      setShowDeleteConfirm(false)
      onClose()
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setStartTime("09:00")
    setEndTime("10:00")
    setCategory("other")
    setIsPrivate(false)
    setRecurrencePattern("none")
    setReminder(15)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Event Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm font-medium">
                Start Time
              </label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endTime" className="text-sm font-medium">
                End Time
              </label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORIES).map(([value, { label, color }]) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recurrence" className="text-sm font-medium">
              Recurrence
            </label>
            <Select value={recurrencePattern} onValueChange={(value) => setRecurrencePattern(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RECURRENCE_PATTERNS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
              <label htmlFor="private" className="text-sm font-medium">
                Private Event
              </label>
            </div>
          </div>

          <div className="flex justify-between space-x-2">
            {event && (
              <Button type="button" variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                Delete
              </Button>
            )}
            <div className="flex space-x-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{event ? "Save Changes" : "Create Event"}</Button>
            </div>
          </div>
        </form>
      </DialogContent>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this event?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}
