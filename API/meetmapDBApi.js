// API/meetmapDBApi.js
const API_URL='SECRET'
const SERVICE_TEST='test.php'
const SERVICE_CHECKLOGIN='checkLogin.php'
const SERVICE_ADDUSER='addUser.php'
const SERVICE_EDITUSER='updateUser.php'
const SERVICE_EDITPASSWORD='updatePassword.php'
const SERVICE_CREATEEVENT='createEvent.php'
const SERVICE_GETLOCALEVENTS='getLocalEvents.php'
const SERVICE_GETMYEVENTS='getMyEvents.php'
const SERVICE_GETMYHISTO='getMyHisto.php'
const SERVICE_UPDATEEVENT='updateEvent.php'

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

  console.log(url)

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

  console.log(url)

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

export function createEvent(name, title, time, description, longitude, latitude) {
  const url=API_URL+SERVICE_CREATEEVENT

  console.log(url)

  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name,
      title: title,
      time: time,
      description: description,
      longitude: longitude,
      latitude: latitude
    })
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getLocalEvents(latitude, longitude, latitudeDelta, longitudeDelta) {
  const url = API_URL+SERVICE_GETLOCALEVENTS

  console.log(url)

  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      longitude: longitude,
      latitude: latitude,
      longitudeDelta: longitudeDelta,
      latitudeDelta: latitudeDelta
    })
  }

    console.log(data.toString())

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMyEvents(name) {
  const url = API_URL+SERVICE_GETMYEVENTS

  console.log(url)

  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name
    })
  }

    console.log(data.toString())

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMyHisto(name) {
  const url = API_URL+SERVICE_GETMYHISTO

  console.log(url)

  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: name
    })
  }

    console.log(data.toString())

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function updateEvent(ID, title, time, description) {
  const url=API_URL+SERVICE_UPDATEEVENT

  console.log(url)

  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      ID: ID,
      title: title,
      time: time,
      description: description
    })
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
