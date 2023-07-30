import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";

export default function Favourites(props) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes based on the favorite value
    const filteredRecipes = props.recipes.filter(
      (recipe) => recipe.favourite === true
    );
    setFavoriteRecipes(filteredRecipes);
  }, [props.recipes, true]);


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
              showToggleSwitch={false}
              isHidden={"Not required"}
            />
          ))
        ) : (
          <Text style={styles.noRecipesText}>No favorite recipes yet</Text>
        )}
      </ScrollView>
    </View>
  );
}

