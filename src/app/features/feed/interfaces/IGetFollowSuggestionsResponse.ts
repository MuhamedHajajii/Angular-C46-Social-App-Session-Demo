export interface Suggestion {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
}

export interface Data {
  suggestions: Suggestion[];
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
  nextPage: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface IGetFollowSuggestionsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}
