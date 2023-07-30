import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#f0efed",
  },
  header: {
    flexDirection: "row", // Set flexDirection to "row" to align items horizontally
    alignItems: "center", // Align items in the center vertically
    marginBottom: 10,
  },
  searchInput: {
    flex: 1, // Use flex: 1 to make the searchInput take up the available space
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10, // Add some right margin to separate the search input and sort button
  },
  sortButton: {
    backgroundColor: "#870F4F",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 15,
    marginHorizontal: 40, // Add some horizontal margin to the text
  }
});

export default styles;
