import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { IAllPostsResponse } from '../interfaces/IAllPostsResponse';
import { IAddPostsResponse } from '../interfaces/IAddPostsResponse';
import { IGetFollowSuggestionsResponse } from '../interfaces/IGetFollowSuggestionsResponse';
import { IToggleFollowUserResponse } from '../interfaces/IToggleFollowUserResponse';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly http = inject(HttpClient);

  getAllPosts(pageNumber = 1) {
    return this.http.get<IAllPostsResponse>(`${App_Apis.posts.get}?limit=10&page=${pageNumber}`);
  }

  addPosts(postData: FormData) {
    return this.http.post<IAddPostsResponse>(App_Apis.posts.add, postData);
  }

  getAllSuggestions() {
    return this.http.get<IGetFollowSuggestionsResponse>(App_Apis.suggestions.get);
  }

  toggleFollowUsers(userId: string) {
    return this.http.put<IToggleFollowUserResponse>(
      `${App_Apis.suggestions.toggleFollowUsers}/${userId}/follow`,
      {},
    );
  }
}
