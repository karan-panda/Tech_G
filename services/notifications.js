export class NotificationService {
    static async requestPermission() {
      if (!("Notification" in window)) {
        return false
      }
  
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }
  
    static async showNotification(title, options) {
      if (!("Notification" in window)) {
        return
      }
  
      if (Notification.permission !== "granted") {
        const permission = await this.requestPermission()
        if (!permission) return
      }
  
      return new Notification(title, options)
    }
  
    static scheduleNotification(event, reminderMinutes) {
      const eventDate = new Date(event.date)
      const [hours, minutes] = event.startTime.split(":").map(Number)
      eventDate.setHours(hours, minutes - reminderMinutes)
  
      const timeUntilNotification = eventDate.getTime() - Date.now()
      if (timeUntilNotification <= 0) return
  
      setTimeout(() => {
        this.showNotification(`Reminder: ${event.title}`, {
          body: `Event starting in ${reminderMinutes} minutes`,
          icon: "/calendar-icon.png",
        })
      }, timeUntilNotification)
    }
  }

  