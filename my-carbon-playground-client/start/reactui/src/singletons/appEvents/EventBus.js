// EventBus.js
class EventBus {
  constructor() {
    if (!EventBus.instance) {
      this.events = {};
      EventBus.instance = this;
    }
    return EventBus.instance;
  }

  // Subscribe to an event
  subscribe(event, subscriberId, listener) {
    if (!this.events[event]) {
      this.events[event] = {};
    }

    if (!this.events[event][subscriberId]) {
      this.events[event][subscriberId] = listener;
    } else {
      console.warn(
        `Subscriber with ID ${subscriberId} already subscribed to ${event}.`
      );
    }
  }

  // Unsubscribe from an event
  unsubscribe(event, subscriberId) {
    if (this.events[event] && this.events[event][subscriberId]) {
      delete this.events[event][subscriberId];
    }
  }

  // Emit an event
  emit(event, data) {
    if (this.events[event]) {
      Object.keys(this.events[event]).forEach((subscriberId) => {
        const listener = this.events[event][subscriberId];
        listener(data);
      });
    }
  }

  // Clear all subscribers from a specific event
  clearEvent(event) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }

  getSubscriptions() {
    return this.events;
  }

  // Clear all events and subscribers
  clearAll() {
    this.events = {};
  }
}

// Create a single instance of the event bus
const eventBus = new EventBus();
Object.freeze(eventBus);

export default eventBus;
