import { z } from 'zod';

export const CreateUserDto = z.object({
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 digits long' }),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
