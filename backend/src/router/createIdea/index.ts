import { z } from 'zod'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

// получение идеи с бэка
export const createIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(1),
      nick: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Nick contain only lowercase letters, number and dashes'),
      description: z.string().min(1),
      text: z.string().min(100, 'Text should be at least 100 characters long'),
    })
  )
  .mutation(({ input }) => {
    ideas.unshift(input)
    return true
  })
