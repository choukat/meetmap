import { PermissionsAndroid} from 'react-native'

export async function requestPositionPermission() {
try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'We need your location',
        message:
          'We need to know where you are ' +
          'so you can use MeetMap',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the position');
      return(true)
    } else {
      console.log('Position permission denied');
      return(false)
    }
  } catch (err) {
    console.warn(err);
    return(false)
  }
}
