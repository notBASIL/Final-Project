import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#bcbcbc'
    },

    modalView: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        marginTop: 100,

    },

    // buttons styling
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    // close button styling
    close: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8B12BD',
        paddingBottom: 5,
        alignSelf: 'flex-end',
        color: 'red',
    },

    // delete button styling
    delete: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        paddingBottom: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    // header title styling
    headerTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2587be',
        paddingBottom: 5,
        alignSelf: 'flex-start',
    },

    // switch styling
    switch: {
        alignSelf: 'center',
        marginTop: 10,
    },

    status: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    ingredientContainer: {
        backgroundColor: 'lightblue',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    ingredientText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    }
});
export default styles;