import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import styles from "./styles";
export default function Header() {
  return (
    <View style={styles.container}>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        
      }}> 
      <Image source={require("../../../assets/book.png")} style={{
        width: 50,
        height: 50,
      }} />
      
      <Text style={styles.text}>CookBook{"\n"}<Text
      style={{
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
  
      }}
      >Complete Recipe App</Text></Text>
      </View>
      <TouchableWithoutFeedback>
          <MaterialCommunityIcons style={styles.text2} name="menu" size={35} color="white" />
        </TouchableWithoutFeedback>
    </View>
    
    
  );
}
