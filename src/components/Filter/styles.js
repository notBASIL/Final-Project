import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row', // Added to display the dropdowns side by side
    justifyContent: 'space-between', // Added to evenly distribute the dropdowns
    marginBottom: 20, // Added to provide spacing between parent containers
  },
  dropdownContainer: {
    flex: 1, // Added to evenly distribute the dropdowns within the parent container
    marginRight: 10, // Added to provide spacing between dropdown containers
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  }
});
export default styles;
