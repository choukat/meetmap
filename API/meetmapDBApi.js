// API/meetmapDBApi.js
const API_URL='https://meetmapapi-dot-meetmap-232214.appspot.com/'
const SERVICE_TEST='test.php'
const SERVICE_CHECKLOGIN='checkLogin.php'
const SERVICE_ADDUSER='addUser.php'
const SERVICE_EDITUSER='updateUser.php'
const SERVICE_EDITPASSWORD='updatePassword.php'

export function testAPI () {
  const url=API_URL+SERVICE_TEST
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function checkLogin(name, password) {
  const url=API_URL+SERVICE_CHECKLOGIN
  console.log(url)

  let data = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function addUser(name, password, email, avatar) {
  const url=API_URL+SERVICE_ADDUSER

  let data = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
      avatar: avatar,
    }),
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function editUser(oldName, name, email, avatar) {
  const url=API_URL+SERVICE_EDITUSER

  let data = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      oldName: oldName,
      name: name,
      email: email,
      avatar: avatar,
    }),
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function editPassword(name, oldPassword, password) {
  const url=API_URL+SERVICE_EDITPASSWORD

  let data = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name,
      oldPassword: oldPassword,
      password: password,
    }),
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
