// файл содержит роутеры для перехода по стр.

// дженерик создаем { ideaNick: ':ideaNick' } и {ideaNick: string}
// в getRouteParams() передаём объект с ключом ideaNick, затем исп. reduce()
// в 'acc' попадет пустой массив, а в 'key' ideaNick(как ключ полученный путем исп. Object.keys(object))
// getRouteParams() возвращает тип Record(объект), где ключ это ключ 'T' со значением string
// в то же время 'T' наследует тип  Record<string, boolean>, т.е.
// тот тип, который передаем затем getRouteParams({ ideaNick: true })
const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

// корневая строка
export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ ideaNick: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
// для перехода на стр. отдельной идеи
// при желании можно изменить ideas${ideaNick} на example${ideaNick}
export const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`

export const getNewIdeaRoute = () => `/ideas/new`

export const getSignUpRoute = () => `/sign-up`

export const getSignInRoute = () => `/sign-in`
