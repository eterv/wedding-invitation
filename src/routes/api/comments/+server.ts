import { connect } from '@planetscale/database';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { DB_HOST, DB_PASS, DB_USER } from '$env/static/private';

function connDatabase() {
  const conn = connect({
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
  });

  return conn;
}

export const GET: RequestHandler = async () => {
  const conn = connDatabase();
  const result = await conn.execute('SELECT * FROM comments');

  return json(result.rows);
};

export const POST: RequestHandler = async ({ request }) => {
  const { id, name, password, body } = await request.json();
  const conn = connDatabase();
  const result = await conn.execute(
    'INSERT INTO comments (id, name, password, body) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [id, name, password, body],
  );

  return json({ result });
};
