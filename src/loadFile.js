/**
 * 异步加载文件
 * @param url 请求路径
 * @param type 标签类型
 * @returns {Promise<unknown>}
 */
export function asyncLoadFile(url, type = 'script') {
  return new Promise((resolve, reject) => {
    let loadFile = document.createElement(type)
    if (type === 'script') {
      loadFile.type = 'text/javascript'
    } else {
      loadFile.rel = 'stylesheet'
      loadFile.type = 'text/css'
    }
    loadFile[type === 'script' ? 'src' : 'href'] = url
    document[[type === 'script' ? 'body' : 'head']].appendChild(loadFile)
    loadFile.onload = data => {
      resolve(data)
    }
    loadFile.onerror = err => {
      reject(err)
    }
  })
}