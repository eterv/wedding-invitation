import pg from 'pg';

import { DB_HOST, DB_PASS, DB_PORT, DB_USER } from '$env/static/private';

export const pool = new pg.Pool({
  database: 'wedding-1:main',
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: Number(DB_PORT),
  ssl: true,
});
