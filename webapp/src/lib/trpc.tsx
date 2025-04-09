import { type TrpcRouter } from '@ideaproject/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'

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
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
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
