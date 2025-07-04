# TailwindCSS 樣式移植指引

## 目標

將 TailwindCSS 的樣式移植到 `module.scss` 中，並使用巢狀結構撰寫樣式，確保 SCSS 的結構與 DOM 結構一致,命名請根據上下文給更有語意化的名稱,型別以及任何其他事情都不需要處理。

## 樣式撰寫規範

1. **優先使用類名選擇器**：如果元素有類名，應優先使用類名選擇器撰寫樣式。
2. **巢狀結構**：樣式應以巢狀方式撰寫，保持清晰的層次結構，並與 DOM 結構對應。
3. 使用camelCase的方式撰寫類名
4. 如果有需要變數結合className則引入classNames並且使用
5. 轉換時不能出現rem
6. 不需要註解,且不能出現inline-style
7. 幫我檢查scss是否有沒有用到的樣式需要幫我移除(需要對照tsx和scss檔案整個幫我檢查),extend之類的需要留下
8. 最後我scss的順序希望跟tsx裡面的dom順序一致,scss從上到下的排列跟dom結構一樣
9. 若是樣式寫在dialog,Modal,Select,SelectWithDropdown裡面裡面需要使用!important加強權重

## 操作步驟

1. 先查看在當前檔案是否有引入scss檔案,若有針對這隻檔案去修改
2. 若沒有找到則在目標檔案旁建立與檔案名稱相同的 `module.scss` 檔案。
3. 如果有檔案名稱一樣的module.scss則直接去檢查
4. 將 TailwindCSS 樣式轉換為 SCSS，需要每一個寫的樣式都要確認有轉換，並引入相關樣式。
5. 我前墜帶有其他名稱的也需要注意,例如xxxClassName這種也需要轉換
6. 更動我的tsx把樣式引入創建的scss
7. 如果有自己的原子className有一些規則如下,也請參照以下規則轉換
   ```
	f+數字 = font-size
	c+數字 = color = var(--c數字)
     ```

8. 有些自己寫的原子className則不用轉換,內容如下
```
show-phone,hide-phone
```
8. 如果有使用overflow-y 則會加上`@include beautyScrollbar();`
9. 如果出現margin或是padding上下左右多個屬性,請使用一個margin或padding來寫(css的四個位置)
10.   如果在jsx裡面有引入圖片在img使用的話改為使用改為使用css來的background來寫 ,如果用Next Image則不需要
11. 需要幫我檢查該module.scss是否有沒有用到的需要幫我刪除,確保scss並沒有多餘不需要用到的名稱
12. 檢查scss的順序希望跟tsx裡面的dom順序一致,scss從上到下的排列跟dom結構一樣
   ```scss
   .selector {
     // 基本樣式

     @include responsive(pc) {
       // PC 專用樣式
     }

     @include responsive(pad) {
       // 平板專用樣式 
     }

     @include responsive(phone) {
       // 手機專用樣式 
     }
   }
   ```

## 範例

假設有以下 HTML 結構：

```jsx
<div className="h-full w-[500px] group">
  <button className="text-[14px] group-hover:bg-[var(--c1)]">Click Me</button>
  <Test className="text-[12px]" wrapperClassName="text-[14px]"/>
</div>
```

轉換後的 SCSS 應如下：

```scss
.container {
	 height:100%;
	 width:500px;

	&:hover{
		.button{
			background:var(--c1);
		}
	}
	.button{
		font-size:14px;
	}

	.test{
		font-size:12px;
	}
	.testWrapper{
		font-size:14px
	}

}
```
container 和 button以及test這是我命名的,請根據上下文自行推斷

需要一步一步確認並且需要確認我tsx裡面都有被轉換到