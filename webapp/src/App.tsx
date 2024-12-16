import { BrowserRouter, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage/index'
import { ViewIdeaPage } from './pages/ViewIdeaPage'

// передаем все страницы внутрь TrpcProvider,
// благодаря этому внутри страничек будут доступны Trpc-функции
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <AllIdeasPage />
          <ViewIdeaPage />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
