import { Text,ScrollView,TouchableOpacity,StyleSheet } from "react-native";

const Home = () => {
    return (
        <ScrollView contentContainerStyle = {styles.container}>
            <TouchableOpacity style = {styles.button}>
                <Text>START</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
    },
    button : {

    },
});
export default Home;