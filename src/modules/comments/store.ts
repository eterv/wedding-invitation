import { writable } from 'svelte/store';

import type { Comment } from './model';

export const editingComment = writable<Comment>();
export const editModalVisible = writable(false);
