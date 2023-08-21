import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import AppleHealthKit from 'react-native-health';

export default function App() {

  AppleHealthKit.isAvailable(() => {});

  return (
    <View style={styles.container}>
      <RingProgress radius={150} strokeWidth={50} progress={0.8}/>
      <View style={styles.values}>
        <Value label='Steps' value='1112'/>
        <Value label='Distance' value='0.75 km'/>
        <Value label='Flights Climbed' value='13'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row', 
    columnGap: 25,
    rowGap: 50,
    flexWrap: 'wrap',
    marginVertical: 100
  }
});
