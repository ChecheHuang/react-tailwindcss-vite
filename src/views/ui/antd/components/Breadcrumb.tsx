import router, { Route } from '@/router/router'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const flattenedRouter = flattenRoutes(router)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    const { name, icon } = getValueByPath(flattenedRouter, url)
    return {
      key: url,
      title: (
        <Link to={url}>
          {icon && icon} <span>{name}</span>
        </Link>
      ),
    }
  })
  const breadcrumbItems = [
    {
      title: (
        <Link to="/ui/antd">
          <HomeOutlined />
        </Link>
      ),
      key: 'home',
    },
  ].concat(extraBreadcrumbItems.filter((_, index) => index !== 0))
  return <AntdBreadcrumb items={breadcrumbItems} />
}

export default memo(Breadcrumb)

function getValueByPath(map: Map<RegExp, any>, path: string) {
  for (const [regex, value] of map.entries()) {
    if (regex.test(path)) {
      return value
    }
  }
  return { name: '', icon: '' }
}

function flattenRoutes(
  routes: Route[]
): Map<RegExp, { name: string; icon?: JSX.Element }> {
  const flattenedRoutes: Map<RegExp, { name: string; icon?: JSX.Element }> =
    new Map()
  const delayedRoutes: { path: string; name: string; icon?: JSX.Element }[] = []

  routes.forEach((route) => {
    const { path, name, icon, children } = route
    const routeInfo = icon ? { name } : { name, icon }
    const flattenedPath = new RegExp(`^${path.replace(/:[^/]+/g, '[^/]+')}$`)

    if (children) {
      // Add current route's path to flattenedRoutes
      flattenedRoutes.set(flattenedPath, routeInfo)

      const nestedRoutes = flattenRoutes(children)
      nestedRoutes.forEach((value, key) => {
        flattenedRoutes.set(key, value)
      })
    } else {
      if (path.includes(':')) {
        // Route contains a regex pattern, delay processing
        delayedRoutes.push({ path, ...routeInfo })
      } else {
        flattenedRoutes.set(flattenedPath, routeInfo)
      }
    }
  })

  // Process delayed routes
  delayedRoutes.forEach(({ path, ...routeInfo }) => {
    const flattenedPath = new RegExp(`^${path.replace(/:[^/]+/g, '[^/]+')}$`)
    flattenedRoutes.set(flattenedPath, routeInfo)
  })

  return flattenedRoutes
}
