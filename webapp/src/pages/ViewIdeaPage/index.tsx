import { useParams } from 'react-router-dom'
import { type ViewIdeaRouteParams } from '../../lib/routes'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>Descriotion of idea 1...</p>
      <div>
        <p>Tex paragrah 1 of idea 1 ...</p>
        <p>Tex paragrah 2 of idea 1 ...</p>
        <p>Tex paragrah 3 of idea 1 ...</p>
      </div>
    </div>
  )
}
