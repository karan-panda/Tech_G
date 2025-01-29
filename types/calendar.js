// Event categories
export const EventCategory = {
    WORK: "work",
    PERSONAL: "personal",
    FAMILY: "family",
    OTHER: "other"
};

// Event visibility
export const EventVisibility = {
    PUBLIC: "public",
    PRIVATE: "private"
};

// Recurrence patterns
export const RecurrencePattern = {
    NONE: "none",
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly"
};

// Event reminder structure
export class EventReminder {
    constructor(id, time, type) {
        this.id = id; // string
        this.time = time; // number (minutes before event)
        this.type = type; // "notification" | "email"
    }
}

// Calendar event structure
export class CalendarEvent {
    constructor(id, title, date, startTime, endTime, category, visibility, recurrence, reminders, description = null, color = null, isRecurringInstance = false, parentEventId = null) {
        this.id = id; // string
        this.title = title; // string
        this.description = description; // string | null
        this.date = date; // Date
        this.startTime = startTime; // string
        this.endTime = endTime; // string
        this.category = category; // EventCategory
        this.color = color; // string | null
        this.visibility = visibility; // EventVisibility
        this.recurrence = recurrence; // { pattern: RecurrencePattern, endDate?: Date }
        this.reminders = reminders; // EventReminder[]
        this.isRecurringInstance = isRecurringInstance; // boolean
        this.parentEventId = parentEventId; // string | null
    }
}

// Event modal properties
export class EventModalProps {
    constructor(isOpen, onClose, onSubmit, onDelete = null, event = null, selectedDate = null) {
        this.isOpen = isOpen; // boolean
        this.onClose = onClose; // function
        this.onSubmit = onSubmit; // function
        this.onDelete = onDelete; // function | null
        this.event = event; // CalendarEvent | null
        this.selectedDate = selectedDate; // Date | null
    }
}

// Category configuration
export class CategoryConfig {
    constructor(name, color, label) {
        this.name = name; // EventCategory
        this.color = color; // string
        this.label = label; // string
    }
}