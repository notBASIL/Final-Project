import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: '#f0efed',
      },
      dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#870F4F',
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
