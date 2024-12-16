import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAllIdeasRoute, getViewIdeaRoute } from './lib/routes'
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
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={getViewIdeaRoute({ ideaNick: ':ideaNick' })} element={<ViewIdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
