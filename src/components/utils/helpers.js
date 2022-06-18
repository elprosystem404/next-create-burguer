

export const concatenating = (a, b) => [...a, b]
export const itemName = (name) => (item) => item.name === name
export const itemEqual = (item) => item.equal === true
export const itemId = (item) => item.id

export const filtering = fn => x => x.filter(fn)
export const mapping = fn => x => x.map(fn)

export const checkIndex = x => key => x.findIndex(id => id === key)

export const getNames = x => x.map(m => m.name)
export const hasCookies = x => x && x.ingredients