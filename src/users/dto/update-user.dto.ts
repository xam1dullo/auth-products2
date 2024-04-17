import { z } from 'zod';

export const UpdateUserDto = z.object({
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character long' })
    .optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .optional(),
  phone: z
    .string()
    .min(10, { message: 'Phone must be at least 10 digits long' })
    .optional(),
});

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
