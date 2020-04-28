/**
 * change localUri if needed
 */
const localUri = 'postgres://:@localhost:5432/satamat-kartalla';

let DB_URI = null;
if (process.env.DATABASE_URL) {
  DB_URI = process.env.DATABASE_URL;
} else {
  DB_URI = localUri;
}

export const url = DB_URI;
export const type = 'postgres';
export const entities = ['src/entity/*.ts'];
export const logging = true;
export const synchronize = true;
