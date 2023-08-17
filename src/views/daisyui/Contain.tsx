import { faker } from '@faker-js/faker'
import { useCallback, useMemo, useState } from 'react'
const users = new Array(100).fill(null).map((_, index) => {
  const name = faker.person.fullName()
  const email = faker.internet.email()
  const phone = faker.phone.number('09## ### ###')
  const avatar = faker.image.avatar()

  return {
    id: index + 1,
    name,
    email,
    phone,
    avatar,
  }
})
const pageSize = 10
const totalPages = Math.ceil(users.length / pageSize)

const Contain = () => {
  const [page, setPage] = useState<number>(1)
  const data = useMemo(() => {
    const pageData = users.slice((page - 1) * pageSize, page * pageSize)
    return pageData
  }, [page])
  const nextPage = useCallback(() => {
    if (page === totalPages) return
    setPage(page + 1)
  }, [page])
  const prevPage = useCallback(() => {
    if (page === 1) return
    setPage(page - 1)
  }, [page])

  return (
    <>
      <div className="overflow-x-auto">
        <Table data={data} />
        <Paginate page={page} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </>
  )
}
interface PaginateProps {
  page: number
  nextPage: () => void
  prevPage: () => void
}

const Paginate: React.FC<PaginateProps> = ({ page, nextPage, prevPage }) => {
  return (
    <div className="w-full flex justify-center join">
      <button onClick={prevPage} className="join-item btn">
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button onClick={nextPage} className="join-item btn">
        »
      </button>
    </div>
  )
}

interface TableProps {
  data: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
  }[]
}
function Table({ data }: TableProps) {
  const [selected, setSelected] = useState<number[]>([])

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([])
    } else {
      setSelected(data.map((item) => item.id))
    }
  }

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const isSelected = (id: number) => selected.includes(id)
  const ratios = [1, 2, 1, 4, 3, 2]

  const cols = ratios.map((ratio, index) => (
    <col
      key={index}
      style={{
        width: `${
          (ratio / ratios.reduce((sum, ratio) => sum + ratio, 0)) * 100
        }%`,
      }}
    />
  ))

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-xs table-pin-rows table-pin-cols table-fixed ">
        <colgroup>{cols}</colgroup>
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selected.length === data.length}
                  onChange={handleSelectAll}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isSelected(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                </label>
              </td>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.avatar}
                  className=" w-8 h-8 rounded-full"
                  alt="Avatar"
                />
              </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <th>
                <button className="btn glass text-white  btn-xs">Detail</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contain
