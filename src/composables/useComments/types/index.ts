import type { PostId } from '@/composables/usePosts/types';

export type CommentId = number;

export interface IComment {
  postId: PostId
  id: CommentId
  name: string
  email: string
  body: string
}
