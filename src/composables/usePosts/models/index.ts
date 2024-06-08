import {IPost} from "../types";

export const setPost = (post?: Partial<IPost>): IPost => {
  return {
    ...(post?.id && {id: post.id}),
    title: post?.title ?? "",
    body: post?.body ?? "",
  }
}
