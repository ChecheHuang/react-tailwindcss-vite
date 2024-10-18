import clsx from 'clsx'
import React, { useState } from 'react'

import CountriesAutocomplete from './CountriesAutocomplete'

interface MenuItem {
  key: string
  type: string
  hidden: boolean
  label: string
  children?: MenuItem[]
}

interface MenuProps {
  data: MenuItem[]
}

const Menu: React.FC<MenuProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState('')
  return (
    <ul data-theme="mytheme" className="menu bg-info text-white w-full h-full">
      <MenuInside
        data={data}
        first={true}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <CountriesAutocomplete />
    </ul>
  )
}
interface MenuInsideProps extends MenuProps {
  first?: boolean
  currentPage: string
  setCurrentPage: (page: string) => void
}
const MenuInside: React.FC<MenuInsideProps> = ({
  data,
  first,
  currentPage,
  setCurrentPage,
}) => {
  const handleLink = (key: string): void => {
    setCurrentPage(key)
  }
  const list = data.map(({ key, children, label, hidden }) => {
    if (hidden) {
      return null
    }

    if (!children) {
      return (
        <li key={key}>
          <div
            className={clsx(
              `focus:bg-transparent`,
              key === currentPage && 'active hover:bg-black ',
            )}
            onClick={() => handleLink(key)}
          >
            {label}
          </div>
        </li>
      )
    }

    return (
      <li key={key}>
        <details open={false}>
          <summary>{label}</summary>
          <MenuInside
            data={children}
            first={false}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </details>
      </li>
    )
  })

  if (first) {
    return <>{list}</>
  }

  return <ul>{list}</ul>
}

export default Menu
