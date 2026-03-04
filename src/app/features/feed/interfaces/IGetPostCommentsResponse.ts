export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  image: string;
  parentComment?: any;
  likes: any[];
  createdAt: string;
  repliesCount: number;
}

export interface Data {
  comments: Comment[];
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface IGetPostCommentsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}
