export interface Post {
  body: string;
  image: string;
  privacy: string;
  user: string;
  sharedPost?: any;
  likes: any[];
  _id: string;
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface Data {
  post: Post;
}

export interface IAddPostsResponse {
  success: boolean;
  message: string;
  data: Data;
}
