export interface User {
  userName: string;
  avatarUrl?: string;
  email: string;
  friends: User[];
}
