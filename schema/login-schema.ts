import z from 'zod';
export const loginFormSchema = z.object({
  email: z.email().min(1, 'Insira seu e-mail!'),
  password: z.string().min(1, 'Insira sua senha!'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
