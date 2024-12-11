import { initTRPC } from '@trpc/server'


const ideas = [
  {
    nick: 'cool-nick-idea-1',
    name: 'Idea1',
    descriotion: 'Idea1 description...',
  },
  {
    nick: 'cool-nick-idea-2',
    name: 'Idea2',
    descriotion: 'Idea2 description...',
  },
  {
    nick: 'cool-nick-idea-3',
    name: 'Idea3',
    descriotion: 'Idea3 description...',
  },
  {
    nick: 'cool-nick-idea-4',
    name: 'Idea4',
    descriotion: 'Idea4 description...',
  },
  {
    nick: 'cool-nick-idea-5',
    name: 'Idea5',
    descriotion: 'Idea5 description...',
  },
]
const x: string = 'hello'
if (true) console.info(x)
const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    // add test error
    // throw new Error('Test error')
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
