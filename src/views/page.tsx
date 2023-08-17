import router from '@/router/router'
import { Link } from 'react-router-dom'
function Home() {
  const displayRouter = router.filter(
    (route) => route.name !== '/' && route.name !== 'Not Found'
  )
  return (
    <div className="h-screen w-screen">
      <div className="flex gap-2 flex-wrap w-full p-4">
        {displayRouter.map((route) => (
          <Link className="border-2 shadow-lg" key={route.path} to={route.path}>
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
