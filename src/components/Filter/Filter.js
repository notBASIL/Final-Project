import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";
import { Picker } from '@react-native-picker/picker';

export default function Filter(props) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category

  useEffect(() => {
    // Filter recipes based on the selected category
    const filteredRecipes = props.recipes.filter(
      (recipe) => recipe.category === selectedCategory
    );
    setRecipes(filteredRecipes);
  }, [props.recipes, selectedCategory]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };


  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select a category:</Text>
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
      <ScrollView>
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
            marginTop: 250

          }}>You don't have any Recipes</Text>
        }
      </ScrollView>
    </View>
  );
}