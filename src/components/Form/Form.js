import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Keyboard,
  SafeAreaView,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import postData from "../../database/write";
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const handleFormSubmission = async (recipeName) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "CookBook",
      body: `"${recipeName}" added to your recipe book`,
    },
    trigger: { seconds: 1 },
  });
};


export default function Form(props) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  const [quantity1, setQuantity1] = useState(0.0)
  const [quantity2, setQuantity2] = useState(0.0)
  const [quantity3, setQuantity3] = useState(0.0)
  const [lactoseFree, setLactoseFree] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [favourite, setFavourite] = useState(false);
  const [cuisine, setCuisine] = useState("Chinese"); // New state variable for cuisines
  const [errorMessage, setErrorMessage] = useState(null);
  const [preparationTime, setPreparationTime] = useState("0 - 10 minutes");

  const showErrorPopup = (message) => {
    Alert.alert(
      "Something Missing",
      message,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  


  const handleAddPress = () => {
    if (recipeName
      && ingredient1 && instructions
    ) {
      postData(
        {
          name: recipeName,
          ingredient1: ingredient1,
          quantity1: quantity1,
          ingredient2: ingredient2,
          quantity2: quantity2,
          ingredient3: ingredient3,
          quantity3: quantity3,
          lactoseFree: lactoseFree,
          glutenFree: glutenFree,
          favourite: favourite,
          instructions: instructions,
          category: category,
          cuisine: cuisine, // Include cuisine in the postData
          preparationTime: preparationTime
        },
        props.refresh
      );
      handleFormSubmission(recipeName);
      setErrorMessage(null);
      setRecipeName("");
      setIngredient1("");
      setIngredient2("");
      setIngredient3("");
      setQuantity1(0.0);
      setQuantity2(0.0);
      setQuantity3(0.0);
      setCuisine("Chinese");
      setLactoseFree(false)
      setGlutenFree(false);
      setFavourite(false);
      setInstructions("");
      setCategory("Breakfast");
      setPreparationTime("0-10 minutes");
      Keyboard.dismiss();
      Alert.alert(
        "Recipe Added",
        "Your recipe has been added successfully",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else {
      showErrorPopup("One or more required fields are missing");
    }

  };
  const handleNameChange = (value) => {
    setRecipeName(value);
  };
  const handleFavouriteChange = (value) => {
    setFavourite(value);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {errorMessage && (
          <View>
            <Text style={styles.text}>Attention!</Text>
            <Text>{errorMessage}</Text>
          </View>
        )}

        <TextInput
          placeholder="Enter recipe name*"
          maxLength={150}
          value={recipeName}
          onChangeText={handleNameChange}
          defaultValue={recipeName}
          style={styles.textInput}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingredient 1*"
            maxLength={300}
            value={ingredient1}
            onChangeText={(value) => setIngredient1(value)}
            defaultValue={ingredient1}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Quantity 1"
            maxLength={300}
            value={quantity1 !== 0 ? quantity1.toString() : ''}
            onChangeText={(value) => setQuantity1(value)}
            keyboardType="numeric"
            onBlur={() => setQuantity1(parseFloat(quantity1))}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingredient 2"
            maxLength={300}
            value={ingredient2}
            onChangeText={(value) => setIngredient2(value)}
            defaultValue={ingredient2}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Quantity 2"
            maxLength={300}
            value={quantity2 !== 0 ? quantity2.toString() : ''}
            onChangeText={(value) => setQuantity2(parseFloat(value))}
            keyboardType="numeric"
            onBlur={() => setQuantity2(parseFloat(quantity2))}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingredient 3"
            maxLength={300}
            value={ingredient3}
            onChangeText={(value) => setIngredient3(value)}
            defaultValue={ingredient3}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Quantity 3"
            maxLength={300}
            value={quantity3 !== 0 ? quantity3.toString() : ''}
            onChangeText={(value) => setQuantity3(value)}
            keyboardType="numeric"
            onBlur={() => setQuantity3(parseFloat(quantity3))}
            style={styles.textInput}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Lactose free"
            checked={lactoseFree}
            onPress={() => setLactoseFree(!lactoseFree)}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Gluten free"
            checked={glutenFree}
            onPress={() => setGlutenFree(!glutenFree)}
            containerStyle={styles.checkbox}
          />
        </View>

        <View style={styles.parentContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select a Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              style={styles.dropdown}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snacks" value="Snacks" />
            </Picker>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select a Cuisine</Text>
            <Picker
              selectedValue={cuisine}
              onValueChange={(value) => setCuisine(value)}
              style={styles.dropdown}
            >
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Western" value="Western" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Indian" value="Indian" />
            </Picker>
          </View>
        </View>


        <Text style={styles.dropdownLabel}>Select the Prepration time range</Text>
        <Picker
          selectedValue={preparationTime}
          onValueChange={(value) => setPreparationTime(value)}
          style={styles.picker}
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
          style={styles.textInput}
        />
        <Button title="Add Recipe" onPress={handleAddPress} />

        <Text>{"\n"}
        </Text><Text>{"\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
