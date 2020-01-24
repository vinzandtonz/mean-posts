export interface IPost {
  id: string;
  title: string;
  content: string;
}

export interface IPostResponse {
  message: string;
  posts: IPost[];
}
