class HashData {
  private data: { [key: string]: any } = {};

  private timers: { [key: string]: NodeJS.Timeout | null } = {};

  set(key: string, data: any, time?: number): boolean {
    this.data[key] = data;

    if (time) {
      const timer = this.timers[key];

      if (timer) {
        clearTimeout(timer);
      }

      this.timers[key] = setTimeout(() => {
        this.data[key] = undefined;
      }, time);
    }

    return true;
  }

  get<T>(key: string): T | false {
    const data = this.data[key];
    if (!data) return false;

    return this.data[key];
  }
}

export const hashData = new HashData();
