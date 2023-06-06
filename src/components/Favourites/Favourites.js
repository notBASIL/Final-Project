import React, { useState, useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "../Recipes/Recipe/Recipe";
import styles from "./styles";

export default function Favourites(props) {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      setRecipes(props.favouriteRecipes);
    }, [props.favouriteRecipes]);
  
    const handleStatusChange = (recipeId) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, done: !recipe.done } : recipe
        )
      );
    };
  
    const handleDelete = (recipeId) => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    };
  
    return (
      <View style={styles.container}>
        <ScrollView>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                refresh={props.refresh}
              />
            ))
          ) : (
            <Text style={styles.noRecipesText}>No favourite recipes yet</Text>
          )}
        </ScrollView>
      </View>
    );
  }