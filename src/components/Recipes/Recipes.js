import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import Recipe from "./Recipe/Recipe";
import styles from "./styles";

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (searchQuery) {
      const filteredRecipes = props.recipes.filter((recipe) => {
        const recipeName = recipe.name ? recipe.name.toLowerCase() : "";
        const cuisine = recipe.cuisine ? recipe.cuisine.toLowerCase() : "";
        const ingredients = [
          recipe.ingredient1,
          recipe.ingredient2,
          recipe.ingredient3,
        ]
          .filter((ingredient) => ingredient)
          .join(" ")
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

  useEffect(() => {
    sortRecipes();
  }, [sortOrder]);

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

  const sortRecipes = () => {
    const sortedRecipes = [...recipes].sort((a, b) => {
      const recipeNameA = a.name.toLowerCase();
      const recipeNameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return recipeNameA.localeCompare(recipeNameB);
      } else {
        return recipeNameB.localeCompare(recipeNameA);
      }
    });
    setRecipes(sortedRecipes);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <View style={styles.container}>
      <Button
        title={sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
        onPress={handleSortOrderChange}
        style={styles.button}
      />
      <TextInput
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <ScrollView>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onStatusChange={handleStatusChange}
              onDelete={props.onDelete}
              refresh={props.refresh}
              showToggleSwitch={true}
            />
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              marginTop: 250,
            }}
          >
            You don't have any Recipes
          </Text>
        )}
      </ScrollView>
    </View>
  );
}