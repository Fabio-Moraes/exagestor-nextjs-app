import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
  selectService: {
    key: string;
    value: { [key: string]: number };
  };
  selectMaterial: {
    key: string;
    value: { [key: string]: number };
  };
  observationBox: {
    key: string;
    value: string;
  };
}

export async function openDatabase(): Promise<IDBPDatabase<MyDB>> {
  return openDB<MyDB>('exatelecom-database', 1, {
    upgrade(db) {
      // Crie ou atualize as lojas de objetos conforme necessário
      if (!db.objectStoreNames.contains('selectService')) {
        db.createObjectStore('selectService', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('selectMaterial')) {
        db.createObjectStore('selectMaterial', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('observationBox')) {
        db.createObjectStore('observationBox', { keyPath: 'key' });
      }
    }
  });
}
