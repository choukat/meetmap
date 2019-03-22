// API/fileTransfertAPI.js
const API_URL='https://www.googleapis.com/upload/storage/v1/b/meetmap-232214.appspot.com/o?uploadType=media&name=test.jpg'

export function uploadImg(image) {
  const url = API_URL
  const imgBody = new FormData()
  imgBody.append('image', image)
  const data = {
    method: 'POST',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
    body: imgBody
  }

  return fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
