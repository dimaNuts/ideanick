import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick contain only lowercase letters, number and dashes'),
  password: z.string().min(1),
})
