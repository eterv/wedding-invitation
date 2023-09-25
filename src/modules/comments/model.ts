export interface Comment {
  id: string;
  name: string;
  password: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function addComment(
  data: Pick<Comment, 'name' | 'password' | 'body'>,
) {
  const url = location.origin + '/api/comments';
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await result.json();
}

export async function getComments(): Promise<Comment[]> {
  const url = location.origin + '/api/comments';
  const result = await fetch(url, { method: 'GET' });

  const items = await result.json();
  return items;
}
