import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Stored_Keys } from '../../../core/constants/stored-keys';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FeedService } from '../../../features/feed/services/feed.service';

@Component({
  selector: 'app-add-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
})
export class AddPostsComponent {
  // injected services
  private readonly fb = inject(FormBuilder);
  private readonly feedService = inject(FeedService);

  @Output() sendAddedPostToParent = new EventEmitter();

  addPostForm = this.fb.group({
    body: [''],
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
      this.addPostForm.patchValue({ image: file });
      this.imagePreview = URL.createObjectURL(file);
    }
  }

  onAddPostSubmit(): void {
    let userData = this.addPostForm.value as Record<string, any>;

    const fd = new FormData();

    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        fd.append(key, userData[key]);
      }
    });

    this.isLoading = true;
    this.feedService.addPosts(fd).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.imagePreview = null;
        this.addPostForm.reset();

        this.sendAddedPostToParent.emit({
          ...response.data.post,
          user: this.userData,
        });
      },
      error: (response) => {
        this.isLoading = false;
      },
    });
  }
}
