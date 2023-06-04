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
    elevation: 1,

    },
    text: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 5,
    },
    text2:
    {
    paddingTop: 5,
    paddingBottom: 8,
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
    }
    });
    export default styles;