import { View, Text, Pressable, Modal, Switch, Alert, } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import styles from "./styles";
import { useState } from "react";
import deleteRecipe from "../../../database/delete";
import updateRecipe from "../../../database/update";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Recipe(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const numIngredients = props.recipe.ingredients.length; // Replace this with the actual number of ingredients
  const [ingredientBgColor, setIngredientBgColor] = useState(Array(numIngredients).fill("lightblue"));
  const [isMetric, setIsMetric] = useState(true);
  const [favourite, setFavourite] = useState(props.recipe.favourite);

  const handleHeartPress = () => {
    handleFavouriteChange(!favourite);
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleIngredientPress = (index) => {
    setIngredientBgColor((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = prevColors[index] === "yellow" ? "lightblue" : "yellow";
      return newColors;
    });
  };

  const handleFavouriteChange = async (value) => {
    const updated = await updateRecipe(props.recipe.id, { favourite: value }, props.refresh)
    setFavourite(value);

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
      <TouchableOpacity onPress={handleModalVisible}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text
              style={{
                ...styles.headerTitle,
                fontSize: 22,
                color: "#870F4F",
              }}
            >
              {props.recipe.name}
            </Text>
            {props.showToggleSwitch && (
              <TouchableOpacity onPress={handleHeartPress}>
                {favourite ? (
                  <MaterialCommunityIcons name="heart" size={24} color="#870F4F" />
                ) : (
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color="#870F4F"
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{

              padding: 10,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 1,
              color: "black",
            }}
          >
            {props.recipe?.category}
          </Text>
          <Text
            style={{
              padding: 10,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 1,
              color: "black",
            }}
          >
            {props.recipe?.cuisine}
          </Text>
          <Text
            style={{
              padding: 10,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 1,
              color: "black",
            }}
          >
            Preparation time: {props.recipe?.preparationTime}
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
          <Text style={{

            fontSize: 15,
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
            color: "grey",
          }}>View Ingredients</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleModalVisible} style={styles.backIcon}>
              <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{props.recipe.name}</Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {!(props.recipe.ingredients.length === 0) && ( // Check if the ingredients list is not empty
            <View style={styles.switch}>
              <Text style={styles.unitText}>g</Text>
              <Switch value={isMetric} onValueChange={() => setIsMetric(!isMetric)} />
              <Text style={styles.unitText}>oz</Text>
            </View>
          )}
          {/* Map over the ingredients list and render each ingredient and quantity */}
          {props.recipe.ingredients.map((ingredient, index) => (
            <View style={styles.alignContainer} key={index}>
              {ingredient.ingredient !== "" && (
                <Pressable onPress={() => handleIngredientPress(index)}>
                  <View
                    style={[
                      styles.ingredientContainer,
                      { backgroundColor: ingredientBgColor[index] },
                    ]}
                  >
                    <Text style={styles.ingredientText}>
                      {index + 1}. {ingredient.ingredient}
                    </Text>
                  </View>
                </Pressable>
              )}
              {ingredient.quantity !== 0.0 && (
                <View style={styles.quantityContainer}>
                  <Text style={styles.ingredientText}>
                    {isMetric
                      ? `${ingredient.quantity.toFixed(2)} g`
                      : `${(ingredient.quantity * 0.03527396).toFixed(2)} oz`}
                  </Text>
                </View>
              )}
            </View>
          ))}

          <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
            }}>Instructions: {props.recipe.instructions}</Text>
          <Text
            style={{
              marginTop: 2,
              marginBottom: 10,
            }}>Preparation time: {props.recipe.preparationTime}</Text>
          <View>

            <Text
              style={{

                padding: 10,
                borderRadius: 10,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: "#870F4F",
              }}
            >
              {props.recipe?.category}
            </Text>
            {props.recipe.glutenFree && props.recipe.lactoseFree && (
              <Text style={styles.label2}>Gluten and Lactose Free</Text>
            )}

            {props.recipe.glutenFree && !props.recipe.lactoseFree && (
              <Text style={styles.label2}>Gluten Free</Text>
            )}

            {!props.recipe.glutenFree && props.recipe.lactoseFree && (
              <Text style={styles.label2}>Lactose Free</Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
