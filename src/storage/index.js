
export default {
  // 存储值
  saveItem (id, key, value) {
    const item = this.getAll()
    if (!item) {
      item[id] = {}
    } else {
      if (!item[id]) {
        item[id] = {}
      }
    }
    item[id][key] = value
    window.sessionStorage.setItem('mall', JSON.stringify(item))
  },
  // 获取值
  getItem (id, key) {
    const item = this.getAll()
    if (!item) {
      return {}
    }
    if (!item[id]) {
      return []
    }
    return item[id][key] || {}
  },
  getAll () {
    return JSON.parse(window.sessionStorage.getItem('mall') || '{}')
  },
  clearItem (id, key) {
    const item = this.getAll()
    if (key) {
      delete item[id][key]
    } else {
      delete item[id]
    }
    window.sessionStorage.setItem('mall', JSON.stringify(item))
  }
}
