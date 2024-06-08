export interface IPost {
  id?: number
  title: string
  body: string
}

export interface IPostFilter {
  _page: number
  _limit: number
}
