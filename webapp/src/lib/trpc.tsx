import { type TrpcRouter } from '@ideaproject/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import Cookies from 'js-cookie'
import superjson from 'superjson'
import { env } from './env'

export const trpc = createTRPCReact<TrpcRouter>()

// клиент react-query документация: https://tanstack.com/query/latest
// управляет логикой запросов(не типами)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

// trpcClient должен знать где endpoint для всех роутеров
const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: env.VITE_BACKEND_TRPC_URL,
      headers: () => {
        const token = Cookies.get('token')
        return {
          ...(token && { authorization: `Bearer ${token}` }),
        }
      },
    }),
  ],
})

// у trpc есть свой Provider, он должен знать о trpcClient и queryClient
// а также для работы QueryClientProvider react-query нам нужно передать queryClient
export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
