import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: '#d2fac3',
        margin: 30,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    textInput: {
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
    },
});
export default styles;