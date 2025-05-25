

export interface Post {
  _id: string | { toString(): string };
  title: string;
  content: string;
}
