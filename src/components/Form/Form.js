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
} from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import postData from "../../database/write";

export default function Form(props) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddPress = () => {
    if (recipeName
        && ingredients && instructions && category
        ) {
      setErrorMessage(null);
      setRecipeName("");
      setIngredients("");
      setFavourite(false);
        setInstructions("");
        setCategory("");
      postData(
        {
          name: recipeName,
          ingredients: ingredients,
          favourite: favourite,
          instructions: instructions,
          category: category,
        },
        props.refresh
      );
      Keyboard.dismiss();
    } else {
      setErrorMessage("Please enter a recipe name");
    }
  };
  const handleNameChange = (value) => {
    setRecipeName(value);
  };
  const handleIngredientsChange = (value) => {
    setIngredients(value);
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
          placeholder="Enter recipe name"
          maxLength={150}
          value={recipeName}
          onChangeText={handleNameChange}
          defaultValue={recipeName}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Ingredients"
          maxLength={300}
          value={ingredients}
          onChangeText={handleIngredientsChange}
          defaultValue={ingredients}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Enter Category"
          maxLength={150}
          value={category}
          onChangeText={(value) => setCategory(value)}
          defaultValue={category}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Instructions"
          maxLength={150}
          value={instructions}
          onChangeText={(value) => setInstructions(value)}
          defaultValue={instructions}
          style={styles.textInput}
        />
        <View>
          <Text style={styles.text2}>Favourite:</Text>
          <Switch value={favourite} onValueChange={handleFavouriteChange} />
        </View>
        <Button title="Add Recipe" onPress={handleAddPress} />
      </View>
    </SafeAreaView>
  );
}
