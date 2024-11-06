import { StatusBar,StyleSheet, Text, View } from 'react-native';
import Home from './components/home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle = 'light-content'
        backgroundColor = '#BA181B'
      />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#BA181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});