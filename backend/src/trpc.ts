import { initTRPC } from '@trpc/server'
import _ from 'lodash'

const ideas = _.times(10, (i) => ({
  nick: `cool-nick-idea-${i}`,
  name: `Idea${i}`,
  description: `Idea${i} description...`,
  text: _.times(10, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    // add test error
    // throw new Error('Test error')
    return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
  }),
})

export type TrpcRouter = typeof trpcRouter
