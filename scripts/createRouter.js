const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const { fileURLToPath } = require('url');

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const PATH = '../src/views'

const createOutput = (arr, initOutputString) => {
  const map = {}

  const result = arr.reduce((acc, cur) => {
    const { routePath, filePath, closestLayout, isLayout, meta } = cur
    const isLazy = meta?.isLazy === undefined ? true : meta.isLazy
    const path = `@/views${filePath}`
    const component = creteComponentName(filePath)
    const isNotLazyImport = `
import ${component} from "${path}"`
    const isNotLazyComponent = `<${component}/>`
    const lazyComponent = `LazyLoad(import('${path}'))`
    const element = isLazy ? lazyComponent : isNotLazyComponent
    if (!isLazy) {
      initOutputString += isNotLazyImport
      delete meta.isLazy
    }
    delete meta.label

    const item = {
      path: routePath === '/' ? '' : routePath,
      element,
      ...meta,
    }
    const condition = {
      isLayout: {
        true: () => {
          map[filePath] = {
            ...item,
            children: [],
          }
          const key = parentKey(filePath, map)
          if (key) {
            map[key].children.push(map[filePath])
          } else {
            acc = [...acc, map[filePath]]
          }
        },
        false: () => {
          if (!closestLayout) {
            map[routePath] = item
            acc = [...acc, map[routePath]]
          } else {
            map[closestLayout].children.push(item)
          }
        },
      },
    }
    condition.isLayout[isLayout]()
    return acc
  }, [])


  const output =
    initOutputString +
    `
const router: Route[] = ${JSON.stringify(
      sortObjectsByFilePathAndIndex(result),
      null,
      2,
    )
      .replace(/"LazyLoad\(.*?\)"/g, (match) => match.replace(/"/g, ''))
      .replace(/"(<[^>]+>)"/g, '$1')
      .replace(/("icon":\s*)"([^"]*)"/g, '$1<$2/>')}
export default router
interface Route {
  path: string
  element: JSX.Element
  name: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}

`
  const targetFile = '../src/router/router.tsx'
  const targetPath = path.resolve(__dirname, targetFile)
  return { output, targetPath }
}

async function main() {
  const { arr, importString } = await createPathArray()
  // console.cuslog(arr)
  let initOutput =
    `import LazyLoad from "./LazyLoad/LazyLoad"\n` +
    organizeImports(importString)
  const { output, targetPath } = createOutput(arr, initOutput)
  // const { output, targetPath } = createOutput(sortArr(arr), initOutput)

  fs.writeFileSync(targetPath, output)
}

async function printDirectoryContents(
  directory,
  parentPath = '/',
  result = {
    arr: [],
    importString: '',
  },
) {
  // 讀取目錄中的所有檔案
  const files = fs.readdirSync(directory)
  // 檢查是否包含 'layout.tsx'
  const hasLayout = files.includes('layout.tsx')
  // 檢查是否包含 'page.tsx'
  const hasPage = files.includes('page.tsx')
  // 尋找最接近的布局檔案並進行路徑格式化
  const closestLayout = findClosestLayout(directory)
    .replace(path.join(__dirname, PATH), '')
    .replace(/\\/g, '/')
    .replace('.tsx', '')
  // 遍歷目錄中的檔案
  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)
    // 如果是目錄，遞迴處理
    if (stat.isDirectory()) {
      const folderPath = path.join(parentPath, file)
      await printDirectoryContents(filePath, folderPath, result)
    } else {
      // 如果不包含布局和頁面檔案，則返回
      if (!hasLayout && !hasPage) return
      const filePath = path
        .join(parentPath, file)
        .replace(/\\/g, '/')
        .replace('.tsx', '')
      // 跳過非頁面和布局的檔案
      if (!filePath.endsWith('page') && !filePath.endsWith('layout')) continue
      // 讀取檔案的元資料
      const fileData = await readMeta(filePath)
      const fileDataImportString = fileData?.importString || ''
      // 如果尚未加入導入字串，則加入
      if (!result.importString.includes(fileDataImportString)) {
        result.importString += fileDataImportString
      }
      // 處理路由路徑並轉換成正則表達式
      const routePathRegex = /\/\([^)]*\)/g
      const paramsRegex = /\[(\w+)\]/g
      const routePath =
        filePath
          .replace(routePathRegex, '')
          .replace(paramsRegex, ':$1')
          .replace(/\/(?:page|layout)$/, '') || '/'
      // 檢查是否為布局檔案
      const isLayout = filePath.endsWith('layout')
      // 如果有元資料則使用，否則建立新的
      const meta = fileData?.meta ? fileData.meta : {}

      // 如果未設置名稱，則使用路由路徑作為名稱
      if (!meta.name) {
        meta.name = routePath
      }
      // 建立路由物件
      const item = {
        routePath,
        filePath,
        isLayout,
        meta,
        closestLayout,
      }
      // 特殊處理404路徑
      if (routePath === '/404') {
        item.meta = {
          name: 'Not Found',
          isHidden: true,
        }
        item.routePath = '/*'
        item.closestLayout = ''
      }
      // 加入到結果中
      result.arr.push(item)
    }
  }
}

const createPathArray = async () => {
  const viewsDirectory = path.join(__dirname, PATH)
  const result = {
    arr: [],
    importString: '',
  }
  await printDirectoryContents(viewsDirectory, '/', result)

  //確保closestLayout有值
  result.arr.sort((a, b) => {
    // 如果 a 是最接近的 layout 而 b 不是，則 a 排在前面
    if (a.filePath === a.closestLayout && b.filePath !== b.closestLayout)
      return -1
    if (a.filePath !== a.closestLayout && b.filePath === b.closestLayout)
      return 1
    return a.routePath.localeCompare(b.routePath)
  })
  return result
}

console.cuslog = (data) => {
  const filePath = path.join(__dirname, 'log.json')
  const jsonString = JSON.stringify(data, null, 2)
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err)
    } else {
      console.log('JSON written to file successfully.')
    }
  })
}



function parentKey(filePath, obj) {
  /**
   * 在給定的物件中，尋找與指定檔案路徑相關的父層鍵值。
   *
   * @param {string} filePath - 檔案路徑
   * @param {object} obj - 物件
   * @returns {(string|boolean)} - 若找到相關的父層鍵值，則回傳該鍵值；若找不到，則回傳 false。
   */
  const keys = Object.keys(obj)
  for (let key of keys) {
    if (key === filePath) continue
    if (filePath.replace('/layout', '').includes(key.replace('/layout', ''))) {
      return key
    }
  }
  return false
}

function findClosestLayout(directory) {
  // 讀取指定目錄中的檔案列表
  const files = fs.readdirSync(directory)
  // 檢查檔案列表中是否包含 'layout.tsx'
  const hasLayout = files.includes('layout.tsx')
  // 如果存在 'layout.tsx'，則回傳其路徑
  if (hasLayout) {
    return path.join(directory, 'layout.tsx')
  }
  // 獲取上一級的目錄路徑
  const parentDirectory = path.dirname(directory)
  // 如果上一級目錄與當前目錄相同，或者當前目錄不包含 'views'，則回傳空字串
  if (parentDirectory === directory || !directory.includes('views')) {
    return ''
  }
  // 遞迴調用函數，搜尋上一級目錄中的 'layout.tsx'
  return findClosestLayout(parentDirectory)
}

//? done

/**
 * 根據檔案路徑和索引對物件陣列進行排序。
 * @param {Array} arr - 要排序的物件陣列。
 * @returns {Array} - 排序後的物件陣列。
 */
function sortObjectsByFilePathAndIndex(arr) {
  // 使用正則表達式匹配檔案路徑中的括號部分
  const regex = /\[.*\]/
  // 對陣列進行排序和處理
  return arr
    .sort((a, b) => {
      // 如果路徑為404頁面，則放在最後
      if (a.path === '/*') return 1
      if (b.path === '/*') return -1
      // 如果路徑包含括號，則放在後面
      const aHasBrackets = regex.test(a.path)
      const bHasBrackets = regex.test(b.path)
      if (aHasBrackets && !bHasBrackets) return 1
      if (!aHasBrackets && bHasBrackets) return -1

      // 根據index存在與否和大小進行排序
      if (a.index !== undefined && b.index === undefined) return -1
      if (a.index === undefined && b.index !== undefined) return 1
      if (a.index !== undefined && b.index !== undefined)
        return a.index - b.index

      // 比較name字首，如果是數字則按照數字排序
      const aIsNumber = /^\d/.test(a.name)
      const bIsNumber = /^\d/.test(b.name)
      if (aIsNumber && bIsNumber) return parseInt(a.name, 10) - parseInt(b.name, 10)
      if (aIsNumber) return -1
      if (bIsNumber) return 1


      return a.path.length - b.path.length
    })
    .map((obj) => {
      // 遞迴排序子元素
      if (Array.isArray(obj.children)) {
        obj.children = sortObjectsByFilePathAndIndex(obj.children)
      }
      // 移除index屬性
      delete obj.index
      return obj
    })
}

function creteComponentName(filePath) {
  /**
   * 根據檔案路徑生成組件名稱
   * @param {string} filePath - 檔案路徑
   * @returns {string} - 生成的組件名稱
   */
  const regex = /^\(.*\)$/
  const regex2 = /\[(.*?)\]/g
  const component = filePath
    .split('/')
    .filter((str) => !regex.test(str))
    .map((str) => {
      const result =
        str.length > 1
          ? str.slice(0, 1).toUpperCase() + str.slice(1)
          : str.toUpperCase()
      const text = result.replace(regex2, '$1')
      if (!str.includes('_')) return text
      const [first, ...rest] = text.split('_')
      return (
        first + rest.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
      )
    })
    .join('')
  return component
}

function organizeImports(importString) {
  /**
   * 將 import 字串進行整理。
   *
   * @param {string} importString - 包含 import 語句的字串。
   * @returns {string} - 整理後的 import 字串。
   */
  const arr = importString.split('\n')
  const importMap = {}

  arr.forEach((importStatement) => {
    if (importStatement.trim() === '') return

    const [_, importPart, fromPart] = importStatement.match(
      /import\s(.*)\sfrom\s'(.*)'/,
    )
    const key = fromPart.trim()

    if (!importMap[key]) {
      importMap[key] = { default: '', named: new Set() }
    }

    if (importPart.startsWith('{')) {
      const imports = importPart.replace(/[{}]/g, '').split(',')
      imports.forEach((importItem) => {
        const trimmedItem = importItem.trim()
        if (!importMap[key].named.has(trimmedItem)) {
          importMap[key].named.add(trimmedItem)
        }
      })
    } else {
      const trimmedItem = importPart.trim()
      if (!importMap[key].default) {
        importMap[key].default = trimmedItem
      }
    }
  })

  const result = Object.entries(importMap).map(([key, value]) => {
    const defaultImports = value.default
    const namedImports =
      value.named.size > 0 ? `{ ${Array.from(value.named).join(', ')} }` : ''
    const importString = [defaultImports, namedImports]
      .filter(Boolean)
      .join(', ')
    return `import ${importString} from "${key}"`
  })

  return result.join('\n')
}

function readMeta(filePath) {
  const regex = /\/([^/]+)$/ // 正則表達式用於從文件路徑中獲取最後一個路徑段
  const match = filePath.match(regex)
  const lastSegment = match ? match[1] : null // 獲取最後一個路徑段
  const metaPath = PATH + filePath.replace(regex, '/meta.ts') // 建立meta文件的路徑

  return new Promise((resolve) => {
    fs.readFile(path.join(__dirname, metaPath), 'utf8', (err, data) => {
      try {
        let importString = '' // 用於儲存匹配的import語句

        const importRegex = /import\s.*from\s+['"]([^'"]+)['"]/g // 正則表達式用於匹配import語句
        const matches = data.match(importRegex)
        if (matches && matches.length > 0) {
          matches.forEach((match) => {
            importString += match + '\n' // 將匹配的import語句添加到importString
            data = data.replace(match, '') // 刪除匹配的import語句
          })
        }
        const metaRegex = /const\s+meta\s+=\s+/ // 正則表達式用於匹配meta變數宣告
        let updatedData = data.replace(metaRegex, '') // 移除meta變數的宣告
        const modifiedString = updatedData.replace(
          /icon:\s*([^,\n}]+)/g,
          "icon: '$1'", // 將icon屬性的值加上引號
        )
        const jsonMeta = eval(`(${modifiedString})`) // 將處理過的字符串轉換成對象
        const res = {
          meta: jsonMeta[lastSegment], // 獲取對應的meta數據
          importString,
        }
        resolve(res)
      } catch (err) {
        resolve() // 解析失敗時，仍然解決promise
      }
    })
  })
}

main()
