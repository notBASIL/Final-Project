import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";
import { Picker } from '@react-native-picker/picker';

export default function Filter(props) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('breakfast'); // State to store the selected category
  const [dietaryPreference, setDietaryPreference] = useState('All')
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    // Filter recipes based on the selected category
    let filteredRecipes = props.recipes.filter(
      (recipe) => recipe.category === selectedCategory && recipe.cuisine === selectedCuisine
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
  }, [props.recipes, selectedCategory, dietaryPreference]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handlePreferenceChange = (value) => {
    setDietaryPreference(value);
  };

  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
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
              <Picker.Item label="Breakfast" value="breakfast" />
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