export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormResponse = LoginForm & {
  token: string;
};
