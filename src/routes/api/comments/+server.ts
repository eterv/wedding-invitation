import { hash, verify } from '@node-rs/argon2';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';

import type { Comment } from '$lib/comments/model';
import type { RequestHandler } from './$types';

import { pool } from '~/lib/server/db';

async function findById<T>(
  id: string,
  select: string[] = ['*'],
): Promise<T | null> {
  const { rows } = await pool.query(
    `SELECT ${select.join(', ')} FROM comments WHERE id = $1`,
    [id],
  );
  if (!rows.length) return null;

  return rows[0] as T;
}

async function deleteById(id: string) {
  const { rows } = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
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
  const result = await pool.query(
    'SELECT id, name, body, created_at, updated_at FROM comments ORDER BY created_at DESC',
  );

  return json(
    result.rows.map(({ id, name, body, created_at, updated_at }) => ({
      id,
      name,
      body,
      createdAt: created_at,
      updatedAt: updated_at,
    })),
  );
};

/**
 * Add comment
 */
export const POST: RequestHandler = async ({ request }) => {
  const { name, password, body } = await request.json();
  const id = crypto.randomUUID();
  const pw = await hash(password);

  const result = await pool.query(
    'INSERT INTO comments (id, name, password, body, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())',
    [id, name, pw, body],
  );

  if (!result) {
    return json({ message: 'Failed to add comment' }, { status: 500 });
  }

  return json({ id, name, body, createdAt: dayjs.utc().format() });
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

  const result = await pool.query(
    'UPDATE comments SET name = $1, body = $2, updated_at = NOW() WHERE id = $3',
    [name, body, id],
  );

  if (!result) {
    return json({ message: 'Failed to update comment' }, { status: 500 });
  }

  return json({ id, name, body, updatedAt: dayjs.utc().format() });
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
