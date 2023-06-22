import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        margin: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#870F4F',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,

    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    heartContainer: {
        marginLeft: 10,
    },

    modalView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        padding: 30,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#870F4F',
        marginTop: 140,

    },

    // buttons styling
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    label: {
        padding: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
    },

    label2: {
        backgroundColor: "#870F4F",
              padding: 10,
              borderRadius: 10,
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
              textAlign: "center",
              color: "white",

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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#870F4F',
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
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'flex-start',

    },
    ingredientText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5,
    },
    toggleSwitch: {
        alignSelf: 'flex-end',
        marginRight: 30,
    }
});
export default styles;