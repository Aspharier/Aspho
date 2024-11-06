import { Text,ScrollView,TouchableOpacity,StyleSheet } from "react-native";
import {  useFonts } from 'expo-font'; 
import { Exo_500Medium } from '@expo-google-fonts/exo';
import { Aclonica_400Regular } from '@expo-google-fonts/aclonica';

const Home = () => {
let [ fontsLoaded ] = useFonts({
    Exo_500Medium,
    Aclonica_400Regular
});

if(!fontsLoaded){
    return null;
}
    return (
        <ScrollView contentContainerStyle = {styles.container}>
            <TouchableOpacity style = {styles.button}>
                <Text style = {styles.buttonText}>START</Text>
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
        padding : 10,
        borderRadius : 15,
        justifyContent : 'center',
        alignItems : 'center',        
        backgroundColor : '#F5F3F4',
    },
    buttonText : {
        fontFamily : 'Exo_500Medium',
        fontWeight : 'bold',
        letterSpacing : 5,
        fontSize : 30,
        color : '#0B090A',
    },
});
export default Home;