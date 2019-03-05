// API/meetmapDBApi.js
const API_URL='https://www.googleapis.com/upload/storage/v1/b/reactimagesdata/o?uploadType=media&name=myObject'

export function uploadImg(uri) {
  const url=API_URL+SERVICE_CHECKLOGIN
  console.log(url)

  let data = {
    method: 'POST',
    headers: {
        'Content-Type': 'image/jpeg',
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
