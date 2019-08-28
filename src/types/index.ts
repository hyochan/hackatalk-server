export enum Role {
  User,
  Admin,
}

export interface Auth {
  id: string;
  role: Role;
}
