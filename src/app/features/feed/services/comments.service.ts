import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IGetPostCommentsResponse } from '../interfaces/IGetPostCommentsResponse';
import { IAddCommentsResponse } from '../interfaces/IAddCommentsResponse';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly http = inject(HttpClient);

  getAllComments(postID: string, pageNumber = 1) {
    return this.http.get<IGetPostCommentsResponse>(
      `${App_Apis.comments.get}/${postID}/comments?page=${pageNumber}&limit=10`,
    );
  }
  addComment(commentData: FormData, postID: string) {
    return this.http.post<IAddCommentsResponse>(
      `${App_Apis.comments.add}/${postID}/comments`,
      commentData,
    );
  }
}
