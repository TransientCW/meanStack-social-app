export interface Post {
  id?: string;
  content?: string;
  title?: string;
  user?: string;
}

export interface DBPost {
  title: string;
  content: string;
  _id: string;
}

export interface PostsFetch {
  message: string;
  posts: DBPost[];
}
