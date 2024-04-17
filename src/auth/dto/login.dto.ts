import { z } from 'zod';

export const LoginDto = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginDtoType = z.infer<typeof LoginDto>;
