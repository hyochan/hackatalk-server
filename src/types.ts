export interface JwtUser {
  userId: string;
  role: number;
  iat: number;
}
export enum Role {
  User,
  Admin,
}

export interface Auth {
  id: string;
  role: Role;
}
