export interface IToggleFollowUserResponseData {
  following: boolean;
  followersCount: number;
}

export interface IToggleFollowUserResponse {
  success: boolean;
  message: string;
  data: IToggleFollowUserResponseData;
}
