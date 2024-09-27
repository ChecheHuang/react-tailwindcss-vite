export const clientLog = (data?: any) => {
  const trace = getStackTrace()
  const fileNamePath = trace
    .split('\n')[3]
    .replace('at', '')
    .replace(/\([^()]*\)/g, '')

  //   console.log("點第三行");
  //   console.log(trace);

  const jsonData = JSON.stringify(replaceUndefined(data), null, 2)
  const newWindow = window.open('', '_blank')
  if (newWindow === null) return
  newWindow.document.write(`
  
        <div style="display: flex; justify-content: center; gap: 10px;">
            <div>檔案位置:${fileNamePath}</div>
            <button onclick="copyToClipboard()">Copy</button>
            <button onclick="window.close()">Close Window</button>
        </div>
        <div style="display: flex; justify-content: center;">
            <pre style="max-width: 900; overflow: auto; height: 89vh; ">${jsonData}</pre>
        </div>
        <script>
          function copyToClipboard() {
            const textArea = document.createElement('textarea');
            const jsonDataString =${JSON.stringify(jsonData)};
            const jsonDataStringWithoutUndefined = jsonDataString.replace(/"undefined"/g, undefined);
            textArea.value ="const copy = " + jsonDataStringWithoutUndefined;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            const result = window.confirm('複製成功!');
            if (result) {
              window.close()
            }
          }

        </script>
      `)

  function replaceUndefined(originObj?: any) {
    if (typeof originObj !== 'object' || originObj === null) return originObj
    if (Array.isArray(originObj)) return originObj
    const obj = { ...originObj }
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        obj[key] === undefined
      ) {
        obj[key] = 'undefined'
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        replaceUndefined(obj[key])
      }
    }
    return obj
  }
  function getStackTrace() {
    let stack

    try {
      throw new Error()
    } catch (e: any) {
      stack = e.stack
    }

    return stack
  }
}

declare global {
  interface Console {
    cuslog: (data?: any) => void
  }
}

console.cuslog = clientLog
