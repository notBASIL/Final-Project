import { View, Text, Pressable, Modal, Switch, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import styles from "./styles";
import { useState } from "react";
import deleteRecipe from "../../../database/delete";

export default function Recipe(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientBgColor1, setIngredientBgColor1] = useState("lightblue");
  const [ingredientBgColor2, setIngredientBgColor2] = useState("lightblue");
  const [ingredientBgColor3, setIngredientBgColor3] = useState("lightblue");
  const [favorite, setFavorite] = useState(props.recipe.favorite);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleIngredientPress1 = () => {
    setIngredientBgColor1((prevColor) =>
      prevColor === "yellow" ? "lightblue" : "yellow"
    );
  };

  const handleIngredientPress2 = () => {
    setIngredientBgColor2((prevColor) =>
      prevColor === "yellow" ? "lightblue" : "yellow"
    );
  };

  const handleIngredientPress3 = () => {
    setIngredientBgColor3((prevColor) =>
      prevColor === "yellow" ? "lightblue" : "yellow"
    );
  };
  
  const handleStatusToggle = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    props.onStatusChange(props.recipe.id, newFavorite);
  };
  

  const handleDelete = () => {
    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          props.onDelete(props.recipe.id);
        },
        style: "destructive",
      },
    ]);
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
            Recipe: {props.recipe.name}
          </Text>
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientText}>
              Ingredient 1: {props.recipe?.ingredient1}
            </Text>
          </View>

          {props.recipe?.ingredient2 && (
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>
                Ingredient 2: {props.recipe.ingredient2}
              </Text>
            </View>
          )}

          {props.recipe?.ingredient3 && (
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>
                Ingredient 3: {props.recipe.ingredient3}
              </Text>
            </View>
          )}

          <Text
            style={{
              backgroundColor: "lightblue",
              padding: 5,
              borderRadius: 5,
              fontSize: 15,
              fontWeight: "bold",
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Category: {props.recipe?.category}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text>Instructions: {props.recipe.instructions}</Text>

            <Switch style={styles.toggleSwitch}
              value={favorite}
              onValueChange={handleStatusToggle}
              thumbColor={favorite ? "red" : "gray"}
              trackColor={{ false: "gray", true: "silver" }}
            />
          </View>
        </View>
      </Pressable>
      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.headerTitle}>{props.recipe.name}</Text>
          <Text>{props.recipe.category}</Text>
          <Pressable onPress={handleIngredientPress1}>
            <View
              style={[
                styles.ingredientContainer,
                { backgroundColor: ingredientBgColor1 },
              ]}
            >
              <Text style={styles.ingredientText}>
                1. {props.recipe.ingredient1}
              </Text>
            </View>
          </Pressable>
          {props.recipe.ingredient2 && (
            <Pressable onPress={handleIngredientPress2}>
              <View
                style={[
                  styles.ingredientContainer,
                  { backgroundColor: ingredientBgColor2 },
                ]}
              >
                <Text style={styles.ingredientText}>
                  2. {props.recipe.ingredient2}
                </Text>
              </View>
            </Pressable>
          )}
          {props.recipe.ingredient3 && (
            <Pressable onPress={handleIngredientPress3}>
              <View
                style={[
                  styles.ingredientContainer,
                  { backgroundColor: ingredientBgColor3 },
                ]}
              >
                <Text style={styles.ingredientText}>
                  3. {props.recipe.ingredient3}
                </Text>
              </View>
            </Pressable>
          )}
          <Text>Instructions: {props.recipe.instructions}</Text>
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
