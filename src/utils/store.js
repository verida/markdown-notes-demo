class Store {
  static set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  static remove(name) {
    localStorage.removeItem(name);
  }

  static clear() {
    localStorage.clear();
  }

  static get(name) {
    const items = localStorage.getItem(name);
    if (items) {
      try {
        return JSON.parse(items);
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }
}

export default Store;
