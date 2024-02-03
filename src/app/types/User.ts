export type User = {
  id: string;
  email: string;
  password: string;
};

export type UserAdmin = {
  id: number | null;
  email: string | null;
  password: string | null;
};
