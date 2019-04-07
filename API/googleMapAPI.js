// API/googleMapAPI.js

const API_KEY='SECRET'

export function getMapData() {
  const url='https://maps.googleapis.com/maps/api/directions/json?origin=41.13694,-73.359778&destination=41.13546,-73.35997&mode=driver&sensor=true&key='+API_KEY

  return(
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {console.log(responseText)})
      .catch((error) => {console.warn(error)})
  )
}
