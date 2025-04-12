import React from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

function Page() {
  // The scrollable element for your list
  const parentRef = React.useRef(null)
  const dynamicParentRef = React.useRef(null)
  const interactiveParentRef = React.useRef(null)

  // 固定高度的 virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    gap: 12,
  })

  // 模擬不同高度的資料
  const dynamicItems = React.useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        title: `項目 ${i}`,
        content: `這是項目 ${i} 的內容，長度不同。`.repeat(
          Math.floor(Math.random() * 4) + 1,
        ),
        type: i % 3 === 0 ? 'large' : i % 3 === 1 ? 'medium' : 'small',
      })),
    [],
  )

  // 可動態調整的項目資料
  const [interactiveItems, setInteractiveItems] = React.useState(() =>
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      title: `可調整項目 ${i}`,
      content: `這是可以動態調整的項目 ${i}`,
      expanded: false, // 是否展開
      customHeight: 50 + (i % 5) * 20, // 自訂高度
    })),
  )

  // 切換項目展開狀態的函式
  const toggleExpanded = React.useCallback((index: number) => {
    setInteractiveItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item,
      ),
    )
  }, [])

  // 調整項目高度的函式
  const adjustHeight = React.useCallback((index: number, delta: number) => {
    setInteractiveItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              customHeight: Math.max(
                30,
                Math.min(200, item.customHeight + delta),
              ),
            }
          : item,
      ),
    )
  }, [])

  // 動態高度的 virtualizer (使用 measureElement)
  const dynamicVirtualizer = useVirtualizer({
    count: dynamicItems.length,
    getScrollElement: () => dynamicParentRef.current,
    estimateSize: () => 60, // 預估高度
    measureElement: (element) => element.getBoundingClientRect().height, // 動態測量
  })

  // 互動式高度調整的 virtualizer
  const interactiveVirtualizer = useVirtualizer({
    count: interactiveItems.length,
    getScrollElement: () => interactiveParentRef.current,
    estimateSize: () => 60,
    measureElement: (element) => element.getBoundingClientRect().height,
  })

  return (
    <div className="flex gap-5 p-5 flex-wrap">
      {/* 固定高度清單 */}
      <div>
        <h3 className="mb-2.5 text-lg font-bold">
          固定高度清單 (estimateSize: 35px)
        </h3>
        <div
          ref={parentRef}
          className="bg-gray-300 my-[4px] w-[300px] h-[400px] overflow-auto border-2 border-gray-400 rounded-lg"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                className="absolute top-0 left-0  p-2 border-b border-gray-300 flex items-center"
                style={{
                  height: `${virtualItem.size}px`,
                  margin: '0 20px',
                  width: 'calc(100% - 40px)',
                  transform: `translateY(${virtualItem.start}px)`,
                  backgroundColor:
                    virtualItem.index % 2 === 0 ? '#f9f9f9' : 'white',
                }}
              >
                Row {virtualItem.index}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          總高度: {rowVirtualizer.getTotalSize()}px
        </p>
      </div>

      {/* 動態高度清單 (使用 measureElement) */}
      <div>
        <h3 className="mb-2.5 text-lg font-bold">
          動態高度清單 (使用 measureElement)
        </h3>
        <div
          ref={dynamicParentRef}
          className="bg-blue-50 w-[300px] h-[400px] overflow-auto border-2 border-blue-500 rounded-lg"
        >
          <div
            style={{
              height: `${dynamicVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {dynamicVirtualizer.getVirtualItems().map((virtualItem) => {
              const item = dynamicItems[virtualItem.index]
              return (
                <div
                  key={virtualItem.key}
                  ref={dynamicVirtualizer.measureElement} // 使用 measureElement 進行動態測量
                  data-index={virtualItem.index} // 提供索引給測量系統
                  className="absolute top-0 left-0 w-full p-3 border-b border-gray-300"
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                    backgroundColor:
                      item.type === 'large'
                        ? '#ffe4e1'
                        : item.type === 'medium'
                          ? '#f0fff0'
                          : '#f0f8ff',
                  }}
                >
                  <div>
                    <h4
                      className={`m-0 mb-2 font-bold ${
                        item.type === 'large'
                          ? 'text-base text-orange-600'
                          : 'text-sm text-gray-800'
                      }`}
                    >
                      {item.title} ({item.type})
                    </h4>
                    <p className="m-0 text-xs leading-relaxed text-gray-600">
                      {item.content}
                    </p>
                    <div className="mt-1 text-[10px] text-gray-400">
                      實際高度: {virtualItem.size}px | 索引: {virtualItem.index}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          總高度: {dynamicVirtualizer.getTotalSize()}px (動態計算)
        </p>
      </div>

      {/* 互動式高度調整清單 */}
      <div>
        <h3 className="mb-2.5 text-lg font-bold">
          互動式高度調整 (即時響應變化)
        </h3>
        <div
          ref={interactiveParentRef}
          className="bg-yellow-50 w-[350px] h-[400px] overflow-auto border-2 border-orange-400 rounded-lg"
        >
          <div
            style={{
              height: `${interactiveVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {interactiveVirtualizer.getVirtualItems().map((virtualItem) => {
              const item = interactiveItems[virtualItem.index]
              return (
                <div
                  key={virtualItem.key}
                  ref={interactiveVirtualizer.measureElement}
                  data-index={virtualItem.index}
                  className={`absolute top-0 left-0 w-full p-2 border-b border-gray-300 transition-all duration-300 ${
                    item.expanded ? 'bg-orange-50' : 'bg-white'
                  }`}
                  style={{
                    transform: `translateY(${virtualItem.start}px)`,
                    minHeight: `${item.customHeight}px`,
                  }}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="m-0 text-sm font-bold">{item.title}</h4>
                      <button
                        onClick={() => toggleExpanded(virtualItem.index)}
                        className={`text-white border-none px-2 py-1 rounded cursor-pointer text-xs ${
                          item.expanded ? 'bg-red-400' : 'bg-teal-400'
                        }`}
                      >
                        {item.expanded ? '收起' : '展開'}
                      </button>
                    </div>

                    <p className="m-0 mb-2 text-xs text-gray-600">
                      {item.content}
                    </p>

                    {item.expanded && (
                      <div className="p-3 bg-blue-50 rounded mb-2 text-xs leading-relaxed">
                        <p>🔍 展開的額外內容：</p>
                        <p>
                          這是展開後才會顯示的詳細資訊，包含更多文字內容來測試動態高度的變化。
                        </p>
                        <p>
                          當你點擊展開/收起按鈕時，React Virtual
                          會自動重新測量這個項目的高度，並更新整個清單的佈局。
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">
                        自訂高度: {item.customHeight}px
                      </span>
                      <button
                        onClick={() => adjustHeight(virtualItem.index, -10)}
                        className="bg-red-300 text-white border-none px-1.5 py-0.5 rounded-sm cursor-pointer text-[10px]"
                      >
                        -10px
                      </button>
                      <button
                        onClick={() => adjustHeight(virtualItem.index, 10)}
                        className="bg-green-300 text-white border-none px-1.5 py-0.5 rounded-sm cursor-pointer text-[10px]"
                      >
                        +10px
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-400 mt-1">
                      實際測量高度: {virtualItem.size}px | 索引:{' '}
                      {virtualItem.index}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          總高度: {interactiveVirtualizer.getTotalSize()}px (即時更新)
        </p>
      </div>
    </div>
  )
}

export default Page
