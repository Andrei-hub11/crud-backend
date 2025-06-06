export interface CreatePostDto {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title: string;
  content: string;
}
