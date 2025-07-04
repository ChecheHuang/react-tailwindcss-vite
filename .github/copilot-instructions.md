# Copilot Instructions: React TypeScript Next.js - 盡早返回 & 資料不變性

本文件提供指引，讓 Copilot 在生成 React TypeScript Next.js 專案的程式碼時，專注於盡早返回 (Early Returns) 和資料不變性 (Immutability) 的原則。 遵循這些原則將能產生更乾淨、更易於維護且更不容易出錯的程式碼。

## 使用正體中文回答我

## 盡早返回 (Early Returns)

**目標：** 透過在遇到錯誤條件或無效狀態時提早退出函式，來減少巢狀結構和複雜性。

**Copilot 指導方針：**

*   **優先考慮盡早返回：** 在生成函式時，特別是 React 元件函式，*務必* 在函式開頭檢查無效的輸入或錯誤條件，並在必要時提早返回。

*   **常見的盡早返回情境：**
    *   **Null/Undefined 檢查：** 在繼續之前，檢查必要的 props 或變數是否有 `null` 或 `undefined` 值。 在適當情況下使用可選鏈結 (`?.`)，但對於關鍵資料，請考慮盡早返回。
    *   **空陣列/物件檢查：** 如果函式依賴於非空的陣列或物件，請檢查其長度/屬性，如果為空則提早返回。
    *   **身份驗證/授權檢查：** 如果使用者未通過身份驗證或未被授權執行操作，請提早返回並顯示適當的訊息或重新導向。
    *   **錯誤狀態：** 如果非同步操作 (例如 API 呼叫) 導致錯誤，請提早返回並顯示錯誤訊息或元件。
    *   **`if...else` 結構：** 即使在使用 `if...else` 結構時，也要考慮是否可以在 `else` 區塊中提早返回，以避免過度巢狀和簡化程式碼流程。
    *   **Promise 的 `resolve` 和 `reject`：** 在 Promise 中，盡可能避免巢狀的 `if...else` 結構。 在 `reject` 的情況下應立即 `reject`，在條件滿足時立即 `resolve`，避免不必要的程式碼執行。
    * 如果有變數寫在className內優先import classNames from 'classnames' 然後使用

*   **返回值：**

    *   **React 元件：** 從 React 元件提早返回時，返回 `null` 或簡單的訊息/佔位符元件。 避免渲染不完整或損壞的 UI。
    *   **函式：** 根據函式的用途，返回預設值（例如 `null`、`undefined`、`false`、空陣列、空物件）或拋出錯誤（見下文）。
    * 如果區塊裡面只有一個return則不需要大括弧,直接接在後面

*   **範例：**

    ```typescript
    // 之前 (較難閱讀，巢狀結構較深)
    function processData(input: number): string {
      if (input > 0) {
        if (input < 100) {
          // 一些處理邏輯
          return `處理結果: ${input * 2}`;
        } else {
          return "輸入值太大";
        }
      } else {
        return "輸入值必須大於 0";
      }
    }

    // 之後 (透過盡早返回更易於閱讀，減少巢狀結構)
    function processData(input: number): string {
      if (input <= 0) return "輸入值必須大於 0"; // 提早返回：處理負數和零

      if (input >= 100) return "輸入值太大"; // 提早返回：處理大於等於 100 的數字
      // 一些處理邏輯
      return `處理結果: ${input * 2}`;
    }

    // 之前 (Promise 巢狀結構)
    function fetchData(id: string): Promise<Data> {
      return new Promise((resolve, reject) => {
        if (id) {
          // 模擬資料提取
          setTimeout(() => {
            const data: Data = { id: id, name: `Data for ${id}` };
            if (data) {
              resolve(data);
            } else {
              reject("找不到資料");
            }
          }, 1000);
        } else {
          reject("ID 為空");
        }
      });
    }

    // 之後 (簡化 Promise，避免巢狀結構)
    function fetchData(id: string): Promise<Data> {
      return new Promise((resolve, reject) => {
        if (!id) {
          return reject("ID 為空"); // 提早 reject
        }

        // 模擬資料提取
        setTimeout(() => {
          const data: Data = { id: id, name: `Data for ${id}` };
          if (!data) {
            return reject("找不到資料"); // 提早 reject
          }
          resolve(data); // 滿足條件則 resolve
        }, 1000);
      });
    }
    ```

## 資料不變性 (Immutability)

**目標：** 透過避免直接修改資料來防止意外的副作用並提高可預測性。

**Copilot 指導方針：**

*   **陣列：**

    *   **避免：** `push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()` (這些會修改原始陣列)。
    *   **使用：** `concat()`、`slice()`、`map()`、`filter()`、`reduce()`、展開運算符 (`...`) 來建立新的陣列。

*   **物件：**

    *   **避免：** 直接賦值給屬性 (例如 `object.property = newValue`)。
    *   **使用：** 物件展開運算符 (`...`) 或 `Object.assign()` 來建立具有更新屬性的新物件。

*   **React 狀態：**

    *   *絕對不要* 直接修改從 `useState` 取得的狀態物件。
    *   *永遠* 使用 `setState` 函式 (或狀態管理庫中的等效函式) 來以不可變的方式更新狀態。

*   **範例：**

    ```typescript
    // 修改陣列 (錯誤)
    function addItem(items: string[], newItem: string[]): string[] {
      items.push(newItem); // 修改原始 'items' 陣列
      return items;
    }

    // 不可變的方式 (正確)
    function addItem(items: string[], newItem: string[]): string[] {
      return [...items, newItem]; // 建立一個包含新項目的新陣列
    }

    // 修改物件 (錯誤)
    function updateObject(obj: { name: string }, newName: string): { name: string } {
      obj.name = newName; // 修改原始 'obj' 物件
      return obj;
    }

    // 不可變的方式 (正確)
    function updateObject(obj: { name: string }, newName: string): { name: string } {
      return { ...obj, name: newName }; // 建立一個具有更新名稱的新物件
    }
    ```

*   **函式庫：** 考慮使用像 Immutable.js 或 Immer 這樣的函式庫來處理更複雜的不可變資料結構和操作。 特別是在處理深度巢狀物件時，請考慮 Immer。

*   **Redux/Zustand (如果適用)：** 在 reducer/slice 中更新狀態時，嚴格遵守 Redux 或 Zustand 的不可變性原則。 使用像 Immer 這樣的函式庫來簡化不可變的更新。

## 錯誤處理

**目標：** 提供穩健的錯誤處理，包括針對異常情況拋出錯誤，並在適當情況下使用 `try...catch` 區塊。

**Copilot 指導方針：**

*   **拋出錯誤：**
    *   當發生意外或無法恢復的錯誤時，*拋出錯誤*，使用 `throw new Error("錯誤訊息")` 語法。 當函式明確期望返回一個值時，這比返回 `null` 或 `undefined` 更好。

*   **`try...catch` 區塊：**
    *   使用 `try...catch` 區塊來處理可能失敗的操作 (例如，網路請求、解析資料)。 確保 `catch` 區塊記錄錯誤並採取適當的措施，例如向使用者顯示錯誤訊息或重試操作。

*   **Async/Await (針對 Promise):**
    *   當處理 Promise 時，*務必使用 `async/await`* 來撰寫更乾淨、更易於閱讀的非同步程式碼。 避免使用 `.then()` 和 `.catch()` 鏈，除非有特別的原因。
    *   將 `await` 關鍵字放在任何返回 Promise 的操作之前，例如 `fetch()`、`axios()` 或任何自定義的非同步函式。
    *   將可能拋出錯誤的 `await` 呼叫放在 `try...catch` 區塊中。

*   **範例**
```typescript
// 拋出錯誤
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("無法除以零。");
  }
  return a / b;
}

// Try...catch 範例，使用 async/await 處理 Promise
async function fetchData(url: string): Promise<any> {
  try {
    const response = await await fetch(url); // 使用 await 等待 fetch 完成
    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
    }
    const data = await response.json(); // 使用 await 等待 json 解析完成
    return data;
  } catch (error: any) {
    console.error("提取資料時發生錯誤：", error);
    throw error; // 重新拋出錯誤，以便由呼叫元件處理。
  }
}