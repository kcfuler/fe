class ModuleLoader {
  modules: Record<string, boolean>;
  callbacks: { keys: string[]; callback: Function }[];

  constructor() {
    this.modules = {};
    this.callbacks = [];
  }

  register(key: string) {
    this.modules[key] = true;
    this.checkCallbacks();
  }

  require(keys: string[], callback) {
    this.callbacks.push({ keys, callback });
  }

  checkCallbacks() {
    this.callbacks = this.callbacks.filter(({ keys, callback }) => {
      const isAllRegister = keys.every((key) => this.modules[key]);
      if (isAllRegister) {
        callback();
        return false;
      }
      return true;
    });
  }
}
