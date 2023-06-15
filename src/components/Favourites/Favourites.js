import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";

export default function Favourites(props) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes based on the favorite status
    if (props.favoriteRecipes) {
      const filteredRecipes = props.favoriteRecipes.filter(
        (recipe) => recipe.favorite === true
      );
      setFavoriteRecipes(filteredRecipes);
    }
  }, [props.favoriteRecipes]);

  const handleStatusChange = (recipeId, newStatus) => {
    const updatedRecipes = favoriteRecipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, favorite: newStatus } : recipe
    );
    setFavoriteRecipes(updatedRecipes);
    props.onStatusChange(recipeId, newStatus);
  };

  const handleDelete = (recipeId) => {
    const updatedRecipes = favoriteRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setFavoriteRecipes(updatedRecipes);
    props.onDelete(recipeId);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
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
