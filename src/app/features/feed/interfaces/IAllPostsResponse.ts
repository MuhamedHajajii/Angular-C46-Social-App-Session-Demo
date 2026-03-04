export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost?: any;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment?: any;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface Data {
  posts: Post[];
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface IAllPostsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}
