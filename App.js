import React, { useState, useEffect } from 'react';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View,Switch } from 'react-native';
import uuid from 'react-uuid';
import Form from './src/components/Form/Form';
import Header from './src/components/Header/Header';
import Recipes from './src/components/Recipes/Recipes';
import styles from './src/styles/main';
import About from './src/components/About/about';
import getPosts from './src/database/read';
import Filter from './src/components/Filter/Filter';
import Favourites from './src/components/Favourites/Favourites';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { color } from 'react-native-elements/dist/helpers';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import ThemeProvider from './src/components/ThemeProvider';
import AppMainComponent from './src/components/AppMainComponent';



const Tab = createBottomTabNavigator();

export default function App() {
  // read the data from the database and use useEffect to update the data
  const [recipes, setRecipes] = useState([]);

  const refresh = () => {
    getPosts(setRecipes);
    console.log('data fetched')
  }

  useEffect(() => {
    refresh();
  }, []);

  // add a new recipe to the database
  const addRecipe = (recipe) => {
    recipe.id = uuid();
    setRecipes([...recipes, recipe]);

  }

  const handleStatusChange = (recipeId, newStatus) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, done: newStatus } : recipe
      )
    );
  };

  const handleDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const favoriteRecipes = recipes.filter((recipe) => recipe.favorite);

  return (
    
    
    <SafeAreaProvider>
      
          {/* <ThemeProvider>
        <AppMainComponent />
        </ThemeProvider> */}
    
     
      <NavigationContainer>
        <SafeAreaView>
          <Header />
        
        </SafeAreaView>
        
        <Tab.Navigator
          initialRouteName="Recipes"
          tabBarActiveTintColor="red"
        >

          <Tab.Screen name="Recipes" options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
            ),
          }}>
            {() => <Recipes recipes={recipes} refresh={refresh} />}
          </Tab.Screen>

          <Tab.Screen name="Add Recipe" options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="table-plus" color={color} size={size} />
            ),
          }}>
            {() => <Form onAddRecipe={addRecipe} refresh={refresh} />}
          </Tab.Screen>

          <Tab.Screen name="Filter" options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="filter" color={color} size={size} />
            ),
          }}>
            {() => <Filter recipes={recipes} refresh={refresh} />}
          </Tab.Screen>

          <Tab.Screen name="Favourites" options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart" color={color} size={size} />
            ),
          }}>
            {() => <Favourites recipes={recipes} refresh={refresh} />}
          </Tab.Screen>

          <Tab.Screen name="About" options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information-outline" color={color} size={size} />
            ),
          }}>
            {() => <About onAddRecipe={addRecipe} refresh={refresh} />}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
      
    </SafeAreaProvider>
    
  );
}
