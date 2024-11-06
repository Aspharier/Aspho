import { Text, StyleSheet, ScrollView } from "react-native";

const Maze = () => {
  return (
    <ScrollView contentContainerStyle = {styles.container}>
      <Text style={styles.text}>HELLO AMAMAMAMA!!</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  text: {
    fontSize: 30,
  },
});
export default Maze;
