/* eslint-disable no-constructor-return */
export class CacheData {
  private data: { [key: string]: any } = {};
  private timers: { [key: string]: NodeJS.Timeout | null } = {};
  private static instance: CacheData;
  private static exists: boolean;

  constructor() {
    if (CacheData.exists) return CacheData.instance;

    CacheData.instance = this;
    CacheData.exists = true;
  }

  public static getInstance(): CacheData {
    if (!CacheData.exists) {
      CacheData.instance = new CacheData();
      CacheData.exists = true;
    }

    return CacheData.instance;
  }

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
