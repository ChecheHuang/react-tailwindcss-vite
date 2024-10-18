import { Link } from 'react-router-dom'

import router, { Route } from '@/router/router'

function Home() {
  const displayRouter = router.filter(
    (route) => route.name !== '/' && route.name !== 'Not Found',
  )
  return (
    <div className="h-screen w-screen">
      <div className="flex gap-2 flex-wrap w-full p-4">
        {flattenRoutes(displayRouter).map((route) => (
          <Link
            className="border-2 shadow-lg btn btn-ghost"
            key={route.path}
            to={route.path}
          >
            {route.name.replace('/', '')}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

function flattenRoutes(routes: Route[]): Route[] {
  const flattenedRoutes: Route[] = []

  function flatten(route: Route) {
    flattenedRoutes.push(route)

    if (route.children) {
      route.children.forEach((child) => {
        flatten(child)
      })
    }
  }

  routes.forEach((route) => {
    flatten(route)
  })

  return flattenedRoutes
}
