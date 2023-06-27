import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";
import { Picker } from '@react-native-picker/picker';

export default function Filter(props) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Breakfast'); // State to store the selected category
  const [dietaryPreference, setDietaryPreference] = useState('All')
  const [selectedCuisine, setSelectedCuisine] = useState('Chinese');
  const [selectedPreparationTime, setSelectedPreparationTime] = useState('0-10 minutes');

  useEffect(() => {
    // Filter recipes based on the selected category
    let filteredRecipes = props.recipes.filter(
      (recipe) => recipe.category === selectedCategory && recipe.cuisine === selectedCuisine && recipe.preparationTime === selectedPreparationTime
    );

    if (dietaryPreference === "Lactose Free") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.lactoseFree === true
      );
    }
    else if (dietaryPreference === "Gluten Free") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.glutenFree === true
      );
    }
    else if (dietaryPreference === "Both") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => (recipe.glutenFree === true && recipe.lactoseFree === true)
      );
    }

    setRecipes(filteredRecipes);
  }, [props.recipes, selectedCategory, dietaryPreference, selectedCuisine, selectedPreparationTime]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handlePreferenceChange = (value) => {
    setDietaryPreference(value);
  };

  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
  };

  const handlePreparationTimeChange = (value) => {
    setSelectedPreparationTime(value);
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          padding: 12,

        }}
      >
        <View style={styles.parentContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select a Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={handleCategoryChange}
              style={styles.dropdown}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snacks" value="Snacks" />
            </Picker>
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Dietary Preference</Text>
            <Picker
              selectedValue={dietaryPreference}
              onValueChange={handlePreferenceChange}
              style={styles.dropdown}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Lactose Free" value="Lactose Free" />
              <Picker.Item label="Gluten Free" value="Gluten Free" />
              <Picker.Item label="Lactose and Gluten Free" value="Both" />
            </Picker>
          </View>
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select a Cuisine</Text>
          <Picker
            selectedValue={selectedCuisine}
            onValueChange={handleCuisineChange}
            style={styles.dropdown}
          >
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Western" value="Western" />
            <Picker.Item label="Italian" value="Italian" />
            <Picker.Item label="Indian" value="Indian" />
          </Picker>

        </View>
        <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Preparation time</Text>
            <Picker
              selectedValue={selectedPreparationTime}
              onValueChange={handlePreparationTimeChange}
              style={styles.dropdown}
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
          </View>
        {
          // map through the recipe and display them or else display a message
          recipes.length > 0 ? recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onStatusChange={props.onStatusChange}
              onDelete={props.onDelete}
              refresh={props.refresh}
            />
          )) : <Text style={{
            textAlign: 'center',
            fontSize: 15,
            marginTop: 150
          }}>You don't have any Recipes</Text>
        }
      </ScrollView>
    </View>
  );
}