import { hash, verify } from '@node-rs/argon2';
import { Connection, connect } from '@planetscale/database';
import { json } from '@sveltejs/kit';

import type { Comment } from '$lib/comments/model';
import type { RequestHandler } from './$types';

import { DB_HOST, DB_PASS, DB_USER } from '$env/static/private';
import { toMySQLDate } from '$lib/utils';

type ExecuteArgs = object | any[] | null;

let conn: Connection;

function connDatabase() {
  if (conn == null) {
    conn = connect({
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
    });
  }
}

async function execute(query: string, args?: ExecuteArgs) {
  connDatabase();
  return await conn.execute(query, args);
}

async function findById<T>(
  id: string,
  select: string[] = ['*'],
): Promise<T | null> {
  const { rows } = await execute(
    `SELECT ${select.join(', ')} FROM comments WHERE id = ?`,
    [id],
  );
  if (!rows.length) return null;

  return rows[0] as T;
}

async function deleteById(id: string) {
  const { rows } = await execute('DELETE FROM comments WHERE id = ?', [id]);
  return !!rows.length;
}

async function matchPassword(id: string, password: string) {
  const item = await findById<Comment>(id, ['password']);
  if (!item) return false;

  return await verify(item.password, password);
}

/**
 * Get all comments
 */
export const GET: RequestHandler = async () => {
  const result = await execute(
    'SELECT * FROM comments ORDER BY createdAt DESC',
  );

  return json(result.rows);
};

/**
 * Add comment
 */
export const POST: RequestHandler = async ({ request }) => {
  const { name, password, body } = await request.json();
  const id = crypto.randomUUID();
  const pw = await hash(password);

  const currentDt = toMySQLDate(new Date());

  const result = await execute(
    'INSERT INTO comments (id, name, password, body, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, pw, body, currentDt, currentDt],
  );

  if (!result) {
    return json({ message: 'Failed to add comment' }, { status: 500 });
  }

  return json({ id, name, body, createdAt: currentDt });
};

/**
 * Update comment
 */
export const PATCH: RequestHandler = async ({ request }) => {
  const { id, name, password, body } = await request.json();

  const matchPw = await matchPassword(id, password);
  if (!matchPw) {
    return json(null, { status: 401 });
  }

  const currentDt = toMySQLDate(new Date());

  const result = await execute(
    'UPDATE comments SET name = ?, body = ?, updatedAt = ? WHERE id = ?',
    [name, body, currentDt, id],
  );

  if (!result) {
    return json({ message: 'Failed to update comment' }, { status: 500 });
  }

  return json({ id, name, body, updatedAt: currentDt });
};

/**
 * Delete comment
 */
export const DELETE: RequestHandler = async ({ request }) => {
  const { id, password } = await request.json();

  const matchPw = await matchPassword(id, password);
  if (!matchPw) {
    return json(null, { status: 401 });
  }

  const result = await deleteById(id);

  return json({ result });
};
