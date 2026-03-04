import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../../../features/feed/services/comments.service';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  // injected services
  private readonly fb = inject(FormBuilder);
  private readonly commentsService = inject(CommentsService);

  @Input() postID!: string;
  @Output() sendAddedCommentToParent = new EventEmitter();

  addCommentsForm = this.fb.group({
    content: [''],
    image: [new File([], '')],
  });

  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);
  isLoading = false;
  // image preview

  imagePreview!: string | null;

  onImageChange(event: Event): void {
    const element = (event.target as HTMLInputElement).files;
    if (element) {
      let file = element![0];
      this.addCommentsForm.patchValue({ image: file });
      this.imagePreview = URL.createObjectURL(file);
    }
  }

  onAddCommentSubmit(): void {
    let userData = this.addCommentsForm.value as Record<string, any>;

    const fd = new FormData();

    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        fd.append(key, userData[key]);
      }
    });

    this.isLoading = true;
    this.commentsService.addComment(fd, this.postID).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.imagePreview = null;
        this.addCommentsForm.reset();

        this.sendAddedCommentToParent.emit({
          ...response.data.comment,
          user: this.userData,
        });
      },
      error: (response: HttpErrorResponse) => {
        this.isLoading = false;
      },
    });
  }
}
