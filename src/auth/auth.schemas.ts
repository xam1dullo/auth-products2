import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  phone: z.string().min(10),
});
