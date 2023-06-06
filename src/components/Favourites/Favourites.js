import React, { useState, useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";

export default function Favourites(props) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes based on the favorite status
    const filteredRecipes = props.recipes.filter((recipe) => recipe.favorite);
    setFavoriteRecipes(filteredRecipes);
  }, [props.recipes]);

  // const handleStatusChange = (recipeId, newStatus) => {
  //   setFavoriteRecipes((prevRecipes) =>
  //     prevRecipes.map((recipe) =>
  //       recipe.id === recipeId ? { ...recipe, favorite: newStatus } : recipe
  //     )
  //   );
  //   props.onStatusChange(recipeId, newStatus);
  // };
  
  // const handleDelete = (recipeId) => {
  //   setFavoriteRecipes((prevRecipes) =>
  //     prevRecipes.filter((recipe) => recipe.id !== recipeId)
  //   );
  //   props.onDelete(recipeId);
  // };
  
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <Recipe
            key={recipe.id}
            recipe={recipe}
            onStatusChange={props.onStatusChange}
            onDelete={props.onDelete} 
            refresh={props.refresh}
            />
          ))
        ) : (
          <Text style={styles.noRecipesText}>No favorite recipes yet</Text>
        )}
      </ScrollView>
    </View>
  );
}