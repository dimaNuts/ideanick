import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage/index';


// передаем все страницы внутрь TrpcProvider,
// благодаря этому внутри страничек будут доступны Trpc-функции
export const App = () => {
	return (
		<TrpcProvider><AllIdeasPage /></TrpcProvider>
	);
}
