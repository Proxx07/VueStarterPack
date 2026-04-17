export type PostId = number;

export interface IPost {
  id: PostId
  title: string
  body: string
  userId: number
}
