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
  Alert
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import postData from "../../database/write";

export default function Form(props) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddPress = () => {
    if (recipeName
      && ingredient1 && instructions && category
    ) {
      setErrorMessage(null);
      setRecipeName("");
      setIngredient1("");
      setIngredient2("");
      setIngredient3("");
      setFavourite(false);
      setInstructions("");
      setCategory("");
      postData(
        {
          name: recipeName,
          ingredient1: ingredient1,
          ingredient2: ingredient2,
          ingredient3: ingredient3,
          favourite: favourite,
          instructions: instructions,
          category: category,
        },
        props.refresh
      );
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
      setErrorMessage("Please enter a recipe name");
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
      <View style={styles.container}>
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

        <TextInput
          placeholder="Enter Category *"
          maxLength={150}
          value={category}
          onChangeText={(value) => setCategory(value)}
          defaultValue={category}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Instructions *"
          maxLength={300}
          value={instructions}
          onChangeText={(value) => setInstructions(value)}
          defaultValue={instructions}
          style={styles.textInput}
        />
        {/* <View>
          <Text style={styles.text2}>Favourite:</Text>
          <Switch value={favourite} onValueChange={handleFavouriteChange} />
        </View> */}
        <Button title="Add Recipe" onPress={handleAddPress} />
      </View>
    </SafeAreaView>
  );
}
