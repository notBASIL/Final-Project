import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: '#d2fac3',
      },
      dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        // align the label to center
        textAlign: 'center',
        marginTop: 10,
      },
      dropdownContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      parentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }      
      
});
export default styles;
