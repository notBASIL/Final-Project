import { View, Text, Image } from "react-native";
import styles from "./styles";
export default function Header() {
  return (
    <View style={styles.container}>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        
      }}> 
      <Image source={require("../../../assets/book.png")} style={{
        width: 40,
        height: 40,
      }} />
      <Text style={styles.text}>CookBook</Text>
      </View>
      <Text style={styles.text2}>Recipe App</Text>
    </View>
  );
}
