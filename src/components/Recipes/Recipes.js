import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import Recipe from "./Recipe/Recipe";
import styles from "./styles";

export default function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
      if (searchQuery) {
        const filteredRecipes = props.recipes.filter((recipe) => {
          const recipeName = recipe.name ? recipe.name.toLowerCase() : '';
          const cuisine = recipe.cuisine ? recipe.cuisine.toLowerCase() : '';
          const ingredients = [
            recipe.ingredient1,
            recipe.ingredient2,
            recipe.ingredient3,
          ]
            .filter((ingredient) => ingredient) // Filter out undefined ingredients
            .join(' ')
            .toLowerCase();
    
          return (
            recipeName.includes(searchQuery.toLowerCase()) ||
            cuisine.includes(searchQuery.toLowerCase()) ||
            ingredients.includes(searchQuery.toLowerCase())
          );
        });
    
        setRecipes(filteredRecipes);
      } else {
        setRecipes(props.recipes);
      }
    }, [props.recipes, searchQuery]);
    
    

    const handleStatusChange = (recipeId, newStatus) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, favorite: newStatus } : recipe
        )
      );
    };
    
    const handleDelete = (recipeId) => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    };
  
    const favoriteRecipes = recipes.filter((recipe) => recipe.done);

    
    
  return (
    <View style={styles.container}>
        <TextInput
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      <ScrollView>
        {
            // map through the recipe and display them or else display a message
            recipes.length > 0 ? recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onStatusChange={handleStatusChange}
                onDelete={props.onDelete}
                refresh={props.refresh}
                showToggleSwitch={true}
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