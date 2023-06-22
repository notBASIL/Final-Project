import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import Recipe from "./Recipe/Recipe";
import styles from "./styles";

export default function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        setRecipes(props.recipes);
    }, [props.recipes]);

    const handleStatusChange = (recipeId, newStatus) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, favorite: newStatus } : recipe
        )
      );
    };
    
    // const handleStatusChange = (recipeId) => {
    //   setRecipes((prevRecipes) =>
    //     prevRecipes.map((recipe) =>
    //       recipe.id === recipeId ? { ...recipe, done: !recipe.done } : recipe
    //     )
    //   );
    // };
  
    const handleDelete = (recipeId) => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    };
  
    const favoriteRecipes = recipes.filter((recipe) => recipe.done);

    
    
  return (
    <View style={styles.container}>
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

