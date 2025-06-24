import React, { useCallback, useMemo } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import { cn as classNames } from '@/lib/utils'

import areaCode from './areaCode.json'

const chinaCommonAreas = [
  'Australia',
  'China',
  'Hong',
  'Taiwan',
  'Korea',
  'United',
  'Canada',
]
const defaultCommonAreas = [
  'Australia',
  'China',
  'Hong',
  'Taiwan',
  'Korea',
  'United',
  'Canada',
]

const isChinese = true

type Option = (typeof areaCode.options)[0]

type VirtualItem =
  | {
      type: 'item'
      data: Option & {
        isLast?: boolean
      }
    }
  | {
      type: 'title'
      data: {
        showText: string
        isFirst?: boolean
      }
    }

function TitleItem({ title, isFirst }: { title: string; isFirst?: boolean }) {
  return (
    <div
      className={classNames(
        ' mb-[8px] mx-[16px] h-[20px] pl-[14px] ',
        !isFirst && 'mt-[30px]',
      )}
    >
      <span className="text-[14px] font-semibold text-gray-800">{title}</span>
    </div>
  )
}

function ListItem({
  label,
  value,
  isLast,
}: Option & {
  isLast?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={classNames(
        'flex mx-[16px] rounede-[16px] font-semibold items-center justify-between h-[60px] hover:bg-gray-50 px-[20px] cursor-pointer',
        !isLast && 'mb-[4px]',
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function Page() {
  const [searchInput, setSearchInput] = React.useState('')
  const parentRef = React.useRef<HTMLDivElement>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const transfer = useCallback(
    (item: Option) => {
      return {
        ...item,
        showText: isChinese ? item.cnNmae : item.name,
        value: '+' + item.value,
      }
    },
    [isChinese],
  )

  const totalList = useMemo(() => {
    const commonAreas = isChinese ? chinaCommonAreas : defaultCommonAreas

    const defaultList = [
      {
        showText: isChinese ? '常用' : 'Common',
        options: areaCode.options
          .filter((item) => {
            return commonAreas.some((area) => item.name === area)
          })
          .map(transfer),
      },
      {
        showText: isChinese ? areaCode.label : areaCode.labelen,
        options: areaCode.options.map(transfer),
      },
    ]
    return defaultList
  }, [transfer, isChinese])

  const virtualItems = React.useMemo((): VirtualItem[] => {
    if (searchInput.trim()) {
      return totalList[1].options
        .filter(
          (item) =>
            item.label.includes(searchInput) ||
            item.value.includes(searchInput) ||
            item.src.includes(searchInput),
        )
        .map((item, idx, arr) => ({
          type: 'item',
          data: {
            ...item,
            isLast: idx === arr.length - 1,
          },
        }))
    }
    const items: VirtualItem[] = []
    totalList.forEach((group, groupIdx) => {
      items.push({
        type: 'title',
        data: {
          showText: group.showText,
          isFirst: groupIdx === 0,
        },
      })
      group.options.forEach((item, idx, arr) => {
        items.push({
          type: 'item',
          data: {
            ...item,
            isLast: idx === arr.length - 1 && groupIdx === 0,
          },
        })
      })
    })
    return items
  }, [searchInput, totalList])

  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height ?? 50
    },
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">React Virtual Demo</h1>
      </div>
      <div className="bg-white py-[20px]">
        <div className="mb-4 mx-[16px]">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="搜尋項目..."
            className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div ref={parentRef} className=" h-[400px]  overflow-auto ">
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const item = virtualItems[virtualItem.index]
              if (!item) return null
              return (
                <div
                  key={virtualItem.index}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  className={`absolute top-0 left-0 w-full `}
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {item.type === 'title' ? (
                    <TitleItem
                      title={item.data.showText}
                      isFirst={item.data.isFirst}
                    />
                  ) : (
                    <ListItem {...item.data} isLast={item.data.isLast} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
