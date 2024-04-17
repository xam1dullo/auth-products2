import { z } from 'zod';

export const RegisterDto = z.object({
  username: z.string().min(1),
  password: z.string().min(6), // You should enforce stronger password policies in production
  phone: z.string().min(10), // Assuming a basic length check for phone numbers
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
