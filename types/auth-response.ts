export type AuthResponse = {
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
