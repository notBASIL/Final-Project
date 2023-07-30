import { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Button, TextInput } from "react-native";
import Recipe from "./Recipe/Recipe";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from Expo vector icons
import { TouchableOpacity } from "react-native"; // Import TouchableOpacity to make the button pressable
import { Modal } from "react-native-paper";

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [modalVisible, setModalVisible] = useState(false);

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
  const favoriteRecipes = recipes.filter((recipe) => recipe.done);

  const hiddenReciepes = recipes.filter((recipe) => recipe.isHide);

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

  const handleShowAll = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={handleSortOrderChange}
          style={styles.sortButton}
        >
          {sortOrder === "asc" ? (
            <MaterialIcons name="sort-by-alpha" size={24} color="white" />
          ) : (
            <MaterialIcons name="sort-by-alpha" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>
        {recipes.length > 0 ? (
          recipes.map((recipe) =>
            recipe.isHide == false
              ? (console.log(recipe),
                (
                  <Recipe
                    key={recipe.id}
                    recipe={recipe}
                    onStatusChange={handleStatusChange}
                    onDelete={props.onDelete}
                    refresh={props.refresh}
                    showToggleSwitch={true}
                    isHidden={false}
                  />
                ))
              : null
          )
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
        <View>
        <Button title="Show all hidden recipes" onPress={handleShowAll} />
        </View>

       
      </ScrollView>
      <Modal visible={modalVisible} style={{
              flexDirection: "column",
              backgroundColor: "white",
              margin: 0,
              padding: 20,
              borderRadius: 7,
              borderWidth: 2,
              borderColor: "#870F4F",
              marginTop: 0,
            }}>
         <TouchableOpacity
                onPress={handleShowAll}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
          <ScrollView style={{}}>
          <View
            
          >
            {modalVisible
              ? hiddenReciepes.map(
                  (recipe) => (
                    console.log(recipe),
                    (
                      <Recipe
                        key={recipe.id}
                        recipe={recipe}
                        onStatusChange={handleStatusChange}
                        onDelete={props.onDelete}
                        refresh={props.refresh}
                        showToggleSwitch={true}
                        isHidden={true}
                      />
                    )
                  )
                )
              : null}
          </View>
            </ScrollView>
        
          <View />
        </Modal>
    </View>
  );
}
