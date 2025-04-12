# React Virtual 使用指南

## 什麼是 React Virtual？

React Virtual 是一個用於建立高效能虛擬化清單和表格的 React 函式庫。當你需要渲染大量資料（如數千或數萬筆記錄）時，傳統的方式會一次性渲染所有項目，導致效能問題。React Virtual 透過「虛擬化」技術，只渲染使用者當前可見的項目，大幅提升應用程式的效能。

## 安裝

```bash
npm install @tanstack/react-virtual
# 或
pnpm add @tanstack/react-virtual
```

## 核心概念

### 1. 虛擬化 (Virtualization)

- 只渲染可視區域內的項目
- 當使用者捲動時，動態載入和卸載項目
- 減少 DOM 節點數量，提升效能

### 2. 估算大小 (Estimate Size)

- 預估每個項目的高度（或寬度）
- 用於計算捲軸容器的總高度
- 可以是固定值或動態計算

### 3. 捲軸元素 (Scroll Element)

- 提供捲軸功能的容器
- 通常設定固定高度和 `overflow: auto`

## 基本用法

### 固定高度清單

```tsx
import React from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

function FixedHeightList() {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: 10000, // 總項目數量
    getScrollElement: () => parentRef.current, // 捲軸容器
    estimateSize: () => 35, // 每個項目的預估高度
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: '400px', // 容器固定高度
        width: '300px',
        overflow: 'auto', // 啟用捲軸
        border: '1px solid #ccc',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`, // 總高度
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`, // 定位項目
              padding: '8px',
              borderBottom: '1px solid #eee',
              backgroundColor:
                virtualItem.index % 2 === 0 ? '#f9f9f9' : 'white',
            }}
          >
            項目 {virtualItem.index}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 動態高度清單

```tsx
import React from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

function DynamicHeightList() {
  const parentRef = React.useRef<HTMLDivElement>(null)

  // 模擬不同高度的資料
  const items = React.useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        content: `這是項目 ${i}，內容長度不同。`.repeat(
          Math.floor(Math.random() * 3) + 1,
        ),
      })),
    [],
  )

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // 預估高度
    measureElement: (element) => element.getBoundingClientRect().height, // 測量實際高度
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: '400px',
        width: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
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
            data-index={virtualItem.index} // 用於測量
            ref={rowVirtualizer.measureElement} // 測量元素
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
              padding: '8px',
              borderBottom: '1px solid #eee',
            }}
          >
            <div>
              <h4>項目 {items[virtualItem.index].id}</h4>
              <p>{items[virtualItem.index].content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 水平虛擬化

```tsx
import React from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

function HorizontalList() {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const columnVirtualizer = useVirtualizer({
    horizontal: true, // 水平虛擬化
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150, // 每個項目的寬度
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: '200px',
        width: '400px', // 容器固定寬度
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
    >
      <div
        style={{
          width: `${columnVirtualizer.getTotalSize()}px`, // 總寬度
          height: '100%',
          position: 'relative',
        }}
      >
        {columnVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${virtualItem.size}px`,
              transform: `translateX(${virtualItem.start}px)`, // 水平定位
              padding: '8px',
              borderRight: '1px solid #eee',
              backgroundColor:
                virtualItem.index % 2 === 0 ? '#f9f9f9' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            項目 {virtualItem.index}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## API 參考

### useVirtualizer 參數

| 參數               | 類型                           | 描述                            |
| ------------------ | ------------------------------ | ------------------------------- |
| `count`            | `number`                       | 總項目數量                      |
| `getScrollElement` | `() => Element`                | 返回捲軸容器元素的函式          |
| `estimateSize`     | `(index: number) => number`    | 估算項目大小的函式              |
| `horizontal`       | `boolean`                      | 是否為水平虛擬化（預設：false） |
| `overscan`         | `number`                       | 額外渲染的項目數量（預設：5）   |
| `measureElement`   | `(element: Element) => number` | 測量元素實際大小的函式          |

### 返回值

| 方法/屬性                         | 描述                           |
| --------------------------------- | ------------------------------ |
| `getVirtualItems()`               | 獲取當前應該渲染的虛擬項目陣列 |
| `getTotalSize()`                  | 獲取所有項目的總大小           |
| `measureElement`                  | 用於測量元素大小的 ref 函式    |
| `scrollToIndex(index, options)`   | 捲動到指定索引的項目           |
| `scrollToOffset(offset, options)` | 捲動到指定偏移量               |

### VirtualItem 物件

```tsx
interface VirtualItem {
  key: string | number // 項目的唯一鍵值
  index: number // 項目在陣列中的索引
  start: number // 項目的開始位置
  end: number // 項目的結束位置
  size: number // 項目的大小
}
```

## 效能最佳化技巧

### 1. 使用 React.memo 避免不必要的重新渲染

```tsx
const VirtualItem = React.memo(
  ({ item, index }: { item: any; index: number }) => {
    return <div>{/* 項目內容 */}</div>
  },
)
```

### 2. 設定適當的 overscan 值

```tsx
const rowVirtualizer = useVirtualizer({
  // ...其他設定
  overscan: 5, // 在可視區域外額外渲染 5 個項目
})
```

### 3. 避免在 estimateSize 中進行複雜計算

```tsx
// ❌ 錯誤：每次都計算
estimateSize: (index) => calculateComplexHeight(data[index])

// ✅ 正確：使用快取或固定值
estimateSize: () => 50
```

## 常見問題

### Q: 為什麼我的清單項目會跳動？

A: 這通常是因為 `estimateSize` 與實際大小差異太大。嘗試：

- 提供更準確的估算值
- 使用 `measureElement` 來測量實際大小

### Q: 如何處理不同大小的項目？

A: 使用動態高度清單的方式，並提供 `measureElement` 函式。

### Q: 如何實現無限捲軸？

A: 監聽捲軸事件，當接近底部時載入更多資料並更新 `count` 值。

## 進階用法

### 無限捲軸載入

```tsx
function InfiniteScrollList() {
  const [items, setItems] = React.useState(() =>
    Array.from({ length: 50 }, (_, i) => `項目 ${i}`),
  )
  const [isLoading, setIsLoading] = React.useState(false)

  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  })

  const loadMore = React.useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    // 模擬 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setItems((prev) => [
      ...prev,
      ...Array.from({ length: 20 }, (_, i) => `項目 ${prev.length + i}`),
    ])
    setIsLoading(false)
  }, [isLoading])

  React.useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems()
    const lastItem = virtualItems[virtualItems.length - 1]

    if (!lastItem) return

    if (lastItem.index >= items.length - 5) {
      loadMore()
    }
  }, [rowVirtualizer.getVirtualItems(), items.length, loadMore])

  return (
    <div
      ref={parentRef}
      style={{
        height: '400px',
        width: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
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
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
              padding: '8px',
              borderBottom: '1px solid #eee',
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
        {isLoading && (
          <div style={{ padding: '20px', textAlign: 'center' }}>載入中...</div>
        )}
      </div>
    </div>
  )
}
```

## 結論

React Virtual 是處理大型清單的強大工具，它能夠：

1. **提升效能**：只渲染可見項目
2. **節省記憶體**：減少 DOM 節點數量
3. **流暢體驗**：支援平滑捲軸和動態載入
4. **靈活配置**：支援固定和動態大小、水平和垂直虛擬化

透過正確使用 React Virtual，你可以輕鬆處理包含數千甚至數萬項目的清單，同時保持良好的使用者體驗。

## 相關資源

- [官方文件](https://tanstack.com/virtual/v3)
- [GitHub 儲存庫](https://github.com/TanStack/virtual)
- [範例集合](https://tanstack.com/virtual/v3/docs/examples/fixed)
