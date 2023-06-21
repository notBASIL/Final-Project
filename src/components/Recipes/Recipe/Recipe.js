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


  const handleDelete = () => {
    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          handleModalVisible(),
            deleteRecipe(props.recipe.id, props.refresh);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <>
      <Pressable onPress={handleModalVisible}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text
              style={{
                ...styles.headerTitle,
                fontSize: 20,
              }}
            >
              Recipe: {props.recipe.name}
            </Text>
            {props.recipe.favourite && (
              <View style={styles.heartContainer}>
                <MaterialCommunityIcons name="heart" size={24} color="red" />
              </View>
            )}
          </View>
          <View>
            <Text style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              color: "green",
              fontWeight: "bold",
              fontSize: 15,
              }} >Ingredients</ Text>
          </View>
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientText}>
              {props.recipe?.ingredient1}
            </Text>
          </View>

          {props.recipe?.ingredient2 && (
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>
                {props.recipe.ingredient2}
              </Text>
            </View>
          )}

          {props.recipe?.ingredient3 && (
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>
                {props.recipe.ingredient3}
              </Text>
            </View>
          )}
<View>
            <Text style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              color: "green",
              fontWeight: "bold",
              fontSize: 15,
              }} >Instructions</ Text>
          </View>
          
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text>{props.recipe.instructions}</Text>
          </View>
          <Text
            style={{
              backgroundColor: "yellow",
              padding: 5,
              borderRadius: 10,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 15,
              textAlign: "center",
              color: "black",
            }}
          >
          {props.recipe?.category}
          </Text>
          {props.recipe.glutenFree && props.recipe.lactoseFree && (
            <Text style={styles.label}>Gluten and Lactose Free</Text>
          )}

          {props.recipe.glutenFree && !props.recipe.lactoseFree && (
            <Text style={styles.label}>Gluten Free</Text>
          )}

          {!props.recipe.glutenFree && props.recipe.lactoseFree && (
            <Text style={styles.label}>Lactose Free</Text>
          )}
          {/* <Text
          style={{
            padding: 5,
            borderRadius: 5,
            fontSize: 15,
            fontWeight: "bold",
            width: "100%",
            marginTop: 5,
            marginLeft: 242,
            color: "green",
          }}
          >Favourite:</Text> */}

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
          <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}>Instructions: {props.recipe.instructions}</Text>
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
