import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: '#870F4F',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    text: {
        color: 'red',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    text2:
    {
        flex: 1,
        marginLeft: 10,
    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    switchText: {
        marginLeft: Platform.OS === 'ios' ? 10 : 0,
        color: '#444'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: -16,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    inputContainer: {
        flexDirection: 'row', // Display the TextInput components side by side
        justifyContent: 'space-between', // Adjust the spacing between the components
    },
    textInput: {
        flex: 1, // Allow the TextInput components to expand and fill the available space evenly
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
    },
    parentContainer: {
        flexDirection: 'row', // Display the components side by side
        justifyContent: 'space-between', // Adjust the spacing between the components
        marginBottom: 20, // Provide spacing between parent containers
    },
    dropdownContainer: {
        flex: 1, // Allow the components to expand and fill the available space evenly
        marginRight: 10, // Provide spacing between dropdown containers
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    }
});
export default styles;