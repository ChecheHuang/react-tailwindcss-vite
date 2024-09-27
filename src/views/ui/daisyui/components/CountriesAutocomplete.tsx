import React, { memo, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

type Props = {
  items: string[]
  value: string
  onChange(val: string): void
  className?: string
}

//we are using dropdown, input and menu component from daisyui
const AutoComplete = (props: Props) => {
  const { items, value, onChange, className = '' } = props
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  return (
    <div
      className={clsx(
        'dropdown text-black',
        {
          'dropdown-open': open,
        },
        className
      )}
      ref={ref}
    >
      <input
        type="text"
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type something.."
        tabIndex={0}
      />
      {/* add this part */}
      <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
        <ul
          className="menu menu-compact "
          // use ref to calculate the width of parent
          style={{ width: ref.current?.clientWidth }}
        >
          {items.map((item, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  onChange(item)
                  setOpen(false)
                }}
                className="border-b border-b-base-content/10 w-full bg-white"
              >
                <button>{item}</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// export default memo(AutoComplete)

type Country = {
  name: {
    common: string
  }
}

const CountriesAutocomplete = () => {
  const [val, setVal] = useState('')
  const [countries, setCountries] = useState<string[]>([])

  //a list to show on the dropdown when user types
  const [items, setItems] = useState<string[]>([])

  //query rest countries api and set the countries list
  useEffect(() => {
    async function fetchData() {
      const url = 'https://restcountries.com/v3.1/all?fields=name'
      const response = await fetch(url)
      const countries = (await response.json()) as Country[]
      const newItems = countries.map((p) => p.name.common).sort()
      setCountries(newItems)
    }

    fetchData()
  }, [])

  useEffect(() => {
    //if there is no value, return the countries list.
    if (!val) {
      setItems(countries)
      return
    }

    //if the val changes, we filter items so that it can be filtered. and set it as new state
    const newItems = countries
      .filter((p) => p.toLowerCase().includes(val.toLowerCase()))
      .sort()
    setItems(newItems)
  }, [countries, val])

  //use the common auto complete component here.
  return <AutoComplete items={items} value={val} onChange={setVal} />
}

export default CountriesAutocomplete
