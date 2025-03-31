import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage/index'
import { NewIdeaPage } from './pages/NewIdeaPage/index'
import { ViewIdeaPage } from './pages/ViewIdeaPage'

import './styles/global.scss'

// передаем все страницы внутрь TrpcProvider,
// благодаря этому внутри страничек будут доступны Trpc-функции
// React Router — это инструмент для создания многостраничных приложений
// интегрируем Layout, обварачиваем страницы
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
