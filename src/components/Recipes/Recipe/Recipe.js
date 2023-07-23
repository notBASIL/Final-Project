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
  const [ingredientBgColor1, setIngredientBgColor1] = useState("lightblue");
  const [ingredientBgColor2, setIngredientBgColor2] = useState("lightblue");
  const [ingredientBgColor3, setIngredientBgColor3] = useState("lightblue");
  const [isMetric, setIsMetric] = useState(true);
  const [favourite, setFavourite] = useState(props.recipe.favourite);

  const handleHeartPress = () => {
    handleFavouriteChange(!favourite);
  };

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
          <View style={styles.switch}>
            <Text style={styles.unitText}>g</Text>
            <Switch value={isMetric} onValueChange={() => setIsMetric(!isMetric)} />
            <Text style={styles.unitText}>oz</Text>
          </View>
          <View style={styles.alignContainer}>
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
            {props.recipe.quantity1 !== 0.0 && (
              // Quantity 1 with the switch
              <View style={styles.quantityContainer}>
                <Text style={styles.ingredientText}>
                  {isMetric
                    ? `${(props.recipe.quantity1).toFixed(2)} g`
                    : `${(props.recipe.quantity1 * 0.03527396).toFixed(2)} oz`}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.alignContainer}>
            {props.recipe.ingredient2 !== "" && (
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
            {props.recipe.quantity2 !== 0.0 && (
              // Quantity 1 with the switch
              <View style={styles.quantityContainer}>
                <Text style={styles.ingredientText}>
                  {isMetric
                    ? `${(props.recipe.quantity2).toFixed(2)} g`
                    : `${(props.recipe.quantity2 * 0.03527396).toFixed(2)} oz`}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.alignContainer}>
            {props.recipe.ingredient3 !== "" && (
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
            {props.recipe.quantity3 !== 0.0 && (
              // Quantity 1 with the switch
              <View style={styles.quantityContainer}>
                <Text style={styles.ingredientText}>
                  {isMetric
                    ? `${(props.recipe.quantity3).toFixed(2)} g`
                    : `${(props.recipe.quantity3 * 0.03527396).toFixed(2)} oz`}
                </Text>
              </View>
            )}
          </View>
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
