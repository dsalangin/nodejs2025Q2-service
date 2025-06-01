export class DBEntity<T extends { id: string }> {
  private _store: T[];

  constructor() {
    this._store = [];
  }

  public getAll(): T[] {
    return this._store;
  }

  public getById(id): T | null {
    const item = this._store.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  public create(data: T): T {
    this._store.push(data);

    return data;
  }

  public update(id, data: T): T {
    const index = this._store.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this._store.splice(index, 1, data);

    return this._store[index];
  }

  public delete(id): T | null {
    const index = this._store.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    return this._store.splice(index, 1)[0];
  }
}
