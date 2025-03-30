import { Link, Outlet } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

// Outlet компонент, который прокидывает в Layout, ту стр., к-ая обернута в Layout
export const Layout = () => {
  return (
    <div>
      <p>
        <b>IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
