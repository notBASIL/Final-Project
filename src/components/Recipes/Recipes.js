import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Recipe from "./Recipe/Recipe";
import styles from "./styles";

export default function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        setRecipes(props.recipes);
    }, [props.recipes]);

    
    
  return (
    <View style={styles.container}>
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

