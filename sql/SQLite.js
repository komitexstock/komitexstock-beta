import * as SQLite from 'expo-sqlite/next';

export const localDatabase = await SQLite.openDatabaseAsync('komitex');