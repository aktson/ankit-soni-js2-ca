export const articlesKey = "articleskey";
export const tokenKey = "tokenKey";
export const userKey = "userKey";



export function getToken() {
  return getFromStorage(tokenKey)

}

export function saveToken(token) {
  saveToStorage(tokenKey, token)

}
export function getUser() {
  const user = getFromStorage(userKey);
  if (user) {
    return user.username
  } else {
    return null
  }

}
export function saveUser(user) {
  saveToStorage(userKey, user)

}


export function getFromStorage(key) {
  const item = localStorage.getItem(key)

  if (!item) {
    return []
  } else {
    return (JSON.parse(item));
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))

}