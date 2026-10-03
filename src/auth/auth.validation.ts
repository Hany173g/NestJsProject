import { z } from 'zod';




export const createUserSchema = z.object({
  name: z.string({
    error: 'Name is required',
  }),

  email: z.email({
    error: 'Invalid email',
  }),

  password: z.string({
    error: 'Password is required',
  }).min(6, {
    error: 'Password must be at least 6 characters',
  }),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;