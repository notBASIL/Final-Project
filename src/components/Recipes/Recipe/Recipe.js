import {
  View,
  Text,
  Pressable,
  Modal,
  Switch,
  Alert,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import styles from "./styles";
import formstyles from "../../Form/styles";
import { useState } from "react";
import deleteRecipe from "../../../database/delete";
import updateRecipe from "../../../database/update";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Recipe(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [hide, setHide] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [recipeName, setRecipeName] = useState(props.recipe.name);
  const [ingredient1, setIngredient1] = useState("");
  const [quantity1, setQuantity1] = useState(0.0);
  const [lactoseFree, setLactoseFree] = useState(props.recipe.lactoseFree);
  const [glutenFree, setGlutenFree] = useState(props.recipe.glutenFree);
  const [instructions, setInstructions] = useState(props.recipe.instructions);
  const [category, setCategory] = useState(props.recipe.category);
  const [cuisine, setCuisine] = useState(props.recipe.cuisine); // New state variable for cuisines
  const [errorMessage, setErrorMessage] = useState(null);
  const [preparationTime, setPreparationTime] = useState(
    props.recipe.preparationTime
  );
  const [ingredientsList, setIngredientsList] = useState(
    props.recipe.ingredients
  );
  const [servingSize, setServingSize] = useState(1);

  const numIngredients = props.recipe.ingredients.length; // Replace this with the actual number of ingredients
  console.log(ingredientsList.length, numIngredients);

  const [ingredientBgColor, setIngredientBgColor] = useState(
    Array(numIngredients).fill("white")
  );
  const [isMetric, setIsMetric] = useState(true);
  const [favourite, setFavourite] = useState(props.recipe.favourite);

  const handleHeartPress = () => {
    handleFavouriteChange(!favourite);
  };

  // New functions to handle serving size changes
  const handleIncrementServingSize = () => {
    setServingSize((prevServingSize) => prevServingSize + 1);
  };

  const handleDecrementServingSize = () => {
    setServingSize((prevServingSize) =>
      prevServingSize > 1 ? prevServingSize - 1 : 1
    );
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleIngredientPress = (index) => {
    setIngredientBgColor((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] =
        prevColors[index] === "lightblue" ? "white" : "lightblue";
      return newColors;
    });
  };

  const handleFavouriteChange = async (value) => {
    const updated = await updateRecipe(
      props.recipe.id,
      { favourite: value },
      props.refresh
    );
    setFavourite(value);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            handleModalVisible(), deleteRecipe(props.recipe.id, props.refresh);
          },
          style: "destructive",
        },
      ]
    );
  };

  const onHandleEdit = () => {
    setModalVisible2(!modalVisible2);
    // console.log(props.recipe.id);
  };

  const Stepper = ({ value, onIncrement, onDecrement }) => {
    return (
      <View style={styles.stepperContainer}>
        <Text style={styles.unitText}>Serving Units</Text>
        <TouchableOpacity onPress={onDecrement} style={styles.stepperMinus}>
          <MaterialCommunityIcons name="minus" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.stepperPlus}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleNameChange = (value) => {
    setRecipeName(value);
  };

  // Function to handle changes in ingredient and quantity fields
  const handleIngredientChange = (index, type, value) => {
    const updatedIngredientsList = [...ingredientsList];
    if (type === "ingredient") {
      // Prevent empty ingredients from being added
      updatedIngredientsList[index].ingredient = value.trim();
    } else if (type === "quantity") {
      const quantity = parseFloat(value);
      // Prevent quantities less than or equal to 0.0 from being added
      updatedIngredientsList[index].quantity = quantity > 0 ? quantity : 0.0;
    }
    setIngredientsList(updatedIngredientsList);
  };

  // Function to remove an ingredient and quantity fields
  const handleDeleteIngredientPress = () => {
    if (ingredientsList.length > 1) {
      setIngredientsList(ingredientsList.slice(0, -1));
    }
  };

  // Function to add new ingredient and quantity fields
  const handleAddIngredientPress = () => {
    setIngredientsList([...ingredientsList, { ingredient: "", quantity: 0.0 }]);
  };

  const handleAddToCart = () => {
    const itemsToAdd = ingredientsList.filter(
      (_, index) => ingredientBgColor[index] === "white"
    );
    setCartItems(itemsToAdd);
  };

  const handleEditSubission = async (hide) => {
    // Check if any of the fields are empty or have a quantity of 0.0
    const hasEmptyFields = ingredientsList.some(
      (item) => item.ingredient.trim() === "" || item.quantity === 0.0
    );

    if (recipeName && instructions && !hasEmptyFields) {
      updateRecipe(
        props.recipe.id,
        {
          name: recipeName,
          ingredients: ingredientsList,
          lactoseFree: lactoseFree,
          glutenFree: glutenFree,
          favourite: favourite,
          instructions: instructions,
          category: category,
          cuisine: cuisine, // Include cuisine in the postData
          preparationTime: preparationTime,
          isHide: hide,
        },
        props.refresh
      );

      Keyboard.dismiss();
      setModalVisible2(!modalVisible2);
      Alert.alert(
        "Updated Successfully",
        "Your recipe has been updated successfully",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else {
      // showErrorPopup("One or more required fields are missing");
      Alert.alert(
        "Error",
        "One or more required fields are missing",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const onHide = () => {
    console.log("hide");
    handleEditSubission(true);
    setHide(true);
  };

  const unHide = () => {
    console.log("unhide");
    handleEditSubission(false);
    setHide(false);
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
                  <MaterialCommunityIcons
                    name="heart"
                    size={24}
                    color="#870F4F"
                  />
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

          <TouchableOpacity onPress={handleAddToCart}>
            <MaterialCommunityIcons
              name="cart-plus"
              size={24}
              color="#870F4F"
              style={styles.addShoppingCartIcon}
            />
          </TouchableOpacity>

          {props.recipe.glutenFree && props.recipe.lactoseFree && (
            <Text style={styles.label}>Gluten and Lactose Free</Text>
          )}

          {props.recipe.glutenFree && !props.recipe.lactoseFree && (
            <Text style={styles.label}>Gluten Free</Text>
          )}

          {!props.recipe.glutenFree && props.recipe.lactoseFree && (
            <Text style={styles.label}>Lactose Free</Text>
          )}
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginBottom: 10,
              textAlign: "center",
              color: "grey",
            }}
          >
            View Ingredients
          </Text>
          {props.isHidden === "Not required" ? null : (
            <TouchableOpacity
              onPress={props.isHidden === true ? unHide : onHide}
            >
              <Text>
                {props.isHidden === true ? (
                  <MaterialCommunityIcons
                    name="eye-outline"
                    size={24}
                    color="#870F4F"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-off-outline"
                    size={24}
                    color="#870F4F"
                  />
                )}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible}>
        <ScrollView style={{}}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={handleModalVisible}
                style={styles.backIcon}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{props.recipe.name}</Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={onHandleEdit}
              >
                <MaterialCommunityIcons name="pencil" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteIcon}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.container2}>
              {/* Stepper component on the left */}
              <Stepper
                value={servingSize}
                onIncrement={handleIncrementServingSize}
                onDecrement={handleDecrementServingSize}
              />

              {/* Switch component on the right */}
              <View style={styles.switch}>
                <Text style={styles.unitText}>g</Text>
                <Switch
                  value={isMetric}
                  onValueChange={() => setIsMetric(!isMetric)}
                />
                <Text style={styles.unitText}>oz</Text>
              </View>
            </View>

            {/* Map over the ingredients list and render each ingredient and quantity */}
            {props.recipe.ingredients.map((ingredient, index) => (
              <View style={styles.alignContainer} key={index}>
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
                <View style={styles.quantityContainer}>
                  <Text style={styles.ingredientText}>
                    {isMetric
                      ? `${(ingredient.quantity * servingSize).toFixed(2)} g`
                      : `${(
                          ingredient.quantity *
                          servingSize *
                          0.03527396
                        ).toFixed(2)} oz`}
                  </Text>
                </View>
              </View>
            ))}

            <Text
              style={{
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Instructions: {props.recipe.instructions}
            </Text>
            <Text
              style={{
                marginTop: 2,
                marginBottom: 10,
              }}
            >
              Preparation time: {props.recipe.preparationTime}
            </Text>
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
              <Text>{"\n"}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Modal 2 */}
        <Modal visible={modalVisible2}>
          <ScrollView style={{}}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setModalVisible2(!modalVisible2)}
                  style={styles.backIcon}
                >
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#870F4F",
                    marginRight: 100,
                  }}
                >
                  Edit Reciepe
                </Text>
              </View>

              <TextInput
                placeholder="Enter recipe name*"
                maxLength={150}
                value={recipeName}
                onChangeText={handleNameChange}
                defaultValue={recipeName}
                style={formstyles.textInput}
              />

              {/* Render the list of ingredient and quantity fields */}
              {ingredientsList.map((item, index) => (
                <View key={index} style={formstyles.inputContainer}>
                  <TextInput
                    placeholder={`Ingredient ${index + 1}*`}
                    maxLength={300}
                    value={item.ingredient}
                    onChangeText={(value) =>
                      handleIngredientChange(index, "ingredient", value)
                    }
                    style={formstyles.textInput}
                  />

                  <TextInput
                    placeholder={`Quantity ${index + 1}*`}
                    maxLength={300}
                    value={item.quantity !== 0 ? item.quantity.toString() : ""}
                    onChangeText={(value) =>
                      handleIngredientChange(index, "quantity", value)
                    }
                    keyboardType="numeric"
                    onBlur={() =>
                      handleIngredientChange(index, "quantity", item.quantity)
                    }
                    style={formstyles.textInput}
                  />
                </View>
              ))}

              {/* Add and Delete buttons side by side */}
              <View style={formstyles.buttonsContainer}>
                <Button title="Add" onPress={handleAddIngredientPress} />

                {/* Delete button to remove last ingredient and quantity fields */}
                <Button
                  title="Delete"
                  onPress={handleDeleteIngredientPress}
                  disabled={ingredientsList.length <= 1}
                  color={ingredientsList.length <= 1 ? "gray" : "red"}
                />
              </View>

              <View style={formstyles.checkboxContainer}>
                <CheckBox
                  title="Lactose free"
                  checked={lactoseFree}
                  onPress={() => setLactoseFree(!lactoseFree)}
                  containerStyle={formstyles.checkbox}
                />
                <CheckBox
                  title="Gluten free"
                  checked={glutenFree}
                  onPress={() => setGlutenFree(!glutenFree)}
                  containerStyle={formstyles.checkbox}
                />
              </View>

              <View style={formstyles.parentContainer}>
                <View style={formstyles.dropdownContainer}>
                  <Text style={formstyles.dropdownLabel}>
                    Select a Category
                  </Text>
                  <Picker
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value)}
                    style={formstyles.dropdown}
                  >
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Snacks" value="Snacks" />
                  </Picker>
                </View>

                <View style={formstyles.dropdownContainer}>
                  <Text style={formstyles.dropdownLabel}>Select a Cuisine</Text>
                  <Picker
                    selectedValue={cuisine}
                    onValueChange={(value) => setCuisine(value)}
                    style={formstyles.dropdown}
                  >
                    <Picker.Item label="Chinese" value="Chinese" />
                    <Picker.Item label="Western" value="Western" />
                    <Picker.Item label="Italian" value="Italian" />
                    <Picker.Item label="Indian" value="Indian" />
                  </Picker>
                </View>
              </View>

              <Text style={formstyles.dropdownLabel}>
                Select the Prepration time range
              </Text>
              <Picker
                selectedValue={preparationTime}
                onValueChange={(value) => setPreparationTime(value)}
                style={formstyles.picker}
              >
                <Picker.Item label="0 - 10 minutes" value="0 - 10 minutes" />
                <Picker.Item label="10 - 15 minutes" value="10 - 15 minutes" />
                <Picker.Item label="15 - 20 minutes" value="15 - 20 minutes" />
                <Picker.Item label="20 - 25 minutes" value="20 - 25 minutes" />
                <Picker.Item label="25 - 30 minutes" value="25 - 30 minutes" />
                <Picker.Item label="30 - 35 minutes" value="30 - 35 minutes" />
                <Picker.Item label="35 - 40 minutes" value="35 - 40 minutes" />
                <Picker.Item label="45+ minutes" value="45+ minutes" />
              </Picker>

              <TextInput
                placeholder="Instructions *"
                maxLength={300}
                value={instructions}
                onChangeText={(value) => setInstructions(value)}
                defaultValue={instructions}
                style={formstyles.textInput}
              />
              <Button title="Save changes" onPress={()=>handleEditSubission(props.recipe.isHide)} />
              <Text>{"\n"}</Text>
            </View>
          </ScrollView>
        </Modal>
      </Modal>
      {/* Shopping Cart Modal */}
      <Modal
        visible={cartItems.length > 0}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.cartModalContainer}>
          <View style={styles.cartModal}>
            {/* <Text style={styles.cartModalTitle}>Shopping Cart</Text> */}
            <Text style={styles.cartModalRecipeName}>{props.recipe.name}</Text>
            <ScrollView>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Text>{item.ingredient}</Text>
                  <Text>{item.quantity.toFixed(2)} g</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.cartModalCloseButton}
              onPress={() => setCartItems([])}
            >
              <Text style={styles.cartModalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
