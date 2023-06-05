import { View, Text, Pressable, Modal, Switch, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import styles from "./styles";
import { useState } from "react";
import deleteRecipe from "../../../database/delete";


export default function Recipe(props) {
  const [modalVisible, setModalVisible] = useState(false);

  console.log(props.recipe?.amount);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

 const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Confirm",
          onPress: () => {
            handleModalVisible(),
            deleteRecipe(props.recipe.id, props.refresh);
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
        { cancelable: false}
    );
      };
        

  return (
    <>
      <Pressable onPress={handleModalVisible}>
        <View style={styles.container}>
          <Text
            style={{
              ...styles.headerTitle,
              fontSize: 20,
            }}
          >
            {props.recipe.name}
          </Text>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 18,
              paddingTop: 10
            }}
          >
            Ingredients: {props.recipe?.ingredients}
          </Text>

          <Text
            style={{
              backgroundColor: "lightblue",
                padding: 5,
                borderRadius: 5,
                fontSize: 15,
                fontWeight: "bold",
                width: "100%",
                marginTop: 10
            }}
          >
            Category: {props.recipe?.category}
          </Text>
          <View 
          style={{ 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10
        }}>
            <Text>
              
              Instructions: {props.recipe.instructions}</Text>

            <Text
              style={{
                ...styles.status,
                color: props.recipe.done ? "green" : "red",
              }}
            >
               {props.recipe.done ? "Favourite" : ""}
            </Text>
          </View>
        </View>
      </Pressable>
      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.headerTitle}>{props.recipe.name}</Text>
          <Text>{props.recipe.category}</Text>
          <Text>{props.recipe.ingredients}</Text>
          
          <View style={styles.buttons}>
            <Pressable onPress={handleModalVisible}>
              <MaterialCommunityIcons name="close" size={24} color="red" />
              <Text style={styles.close}>Close</Text>
            </Pressable>
            <Pressable onPress={handleDelete}>
              <MaterialCommunityIcons name="delete" size={24} color="red" />
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
