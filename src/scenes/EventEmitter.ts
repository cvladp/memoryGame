export class EventEmitter {
  private static instance: EventEmitter;
  private listeners: { [event: string]: Array<(data?: any) => void> } = {};

  private constructor() {}

  static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  on(event: string, listener: (data?: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: (data?: any) => void) {
    if (!this.listeners[event]) {
      return;
    }
    const index = this.listeners[event].indexOf(listener);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  emit(event: string, data?: any) {
    if (!this.listeners[event]) {
      return;
    }
    for (const listener of this.listeners[event]) {
      listener(data);
    }
  }
}