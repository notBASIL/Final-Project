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
  const [lactoseFree, setLactoseFree] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("breakfast");
  const [favourite, setFavourite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleAddPress = () => {
    if (recipeName
      && ingredient1 && instructions
    ) {
      postData(
        {
          name: recipeName,
          ingredient1: ingredient1,
          ingredient2: ingredient2,
          ingredient3: ingredient3,
          lactoseFree: lactoseFree,
          glutenFree: glutenFree,
          favourite: favourite,
          instructions: instructions,
          category: category,
        },
        props.refresh
      );
      handleFormSubmission(recipeName);
      setErrorMessage(null);
      setRecipeName("");
      setIngredient1("");
      setIngredient2("");
      setIngredient3("");
      setLactoseFree(false)
      setGlutenFree(false);
      setFavourite(false);
      setInstructions("");
      setCategory("breakfast");
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
      setErrorMessage("One or more required fields are missing");
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
          placeholder="Enter recipe name *"
          maxLength={150}
          value={recipeName}
          onChangeText={handleNameChange}
          defaultValue={recipeName}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Ingredient 1 *"
          maxLength={300}
          value={ingredient1}
          onChangeText={(value) => setIngredient1(value)}
          defaultValue={ingredient1}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Ingredient 2"
          maxLength={300}
          value={ingredient2}
          onChangeText={(value) => setIngredient2(value)}
          defaultValue={ingredient2}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Ingredient 3"
          maxLength={300}
          value={ingredient3}
          onChangeText={(value) => setIngredient3(value)}
          defaultValue={ingredient3}
          style={styles.textInput}
        />
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
        <Text style={styles.dropdownLabel}>Select a Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Snacks" value="Snacks" />
        </Picker>

        <TextInput
          placeholder="Instructions *"
          maxLength={300}
          value={instructions}
          onChangeText={(value) => setInstructions(value)}
          defaultValue={instructions}
          style={styles.textInput}
        />
        <View style={styles.switch}>
          <Switch value={favourite} onValueChange={handleFavouriteChange} />
          <Text style={styles.switchText}>Favourite</Text>
        </View>
        <Button title="Add Recipe" onPress={handleAddPress} />
        <Text>{"\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
