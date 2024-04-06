import dayjs from 'dayjs';

import type { HttpMethod } from '@sveltejs/kit';
import type { Dayjs } from 'dayjs';

import { WrongPasswordError } from '$lib/error';

export interface Comment {
  id: string;
  name: string;
  password: string;
  body: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

async function fetchComment(method: HttpMethod, data?: Record<string, any>) {
  const url = location.origin + '/api/comments';
  return await fetch(url, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function addComment(
  data: Pick<Comment, 'name' | 'password' | 'body'>,
): Promise<Comment> {
  const res = await fetchComment('POST', data);

  const newData: Comment = await res.json();
  newData.createdAt = dayjs(newData.createdAt);

  return newData;
}

export async function deleteComment(id: string, password: string) {
  const res = await fetchComment('DELETE', { id, password });

  if (res.status === 401) throw new WrongPasswordError();

  return await res.json();
}

export async function getComments(): Promise<Comment[]> {
  const res = await fetchComment('GET');

  const items = (await res.json()) as Comment[];

  const newItems = items.map((item) => {
    return {
      ...item,
      createdAt: dayjs(item.createdAt),
    } as Comment;
  });

  return newItems;
}

export async function updateComment(
  data: Pick<Comment, 'id' | 'name' | 'password' | 'body'>,
): Promise<Comment> {
  const res = await fetchComment('PATCH', data);

  if (res.status === 401) throw new WrongPasswordError();

  const updatedData: Comment = await res.json();
  updatedData.updatedAt = dayjs(updatedData.updatedAt);

  return updatedData;
}
