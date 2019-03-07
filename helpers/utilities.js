//helpers/utilities.js

export function findCoordinates() {
  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};
