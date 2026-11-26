export type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  auth: {
    expiresIn: number;
  };
};
