import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        margin: 10,
        padding: 20,
        borderRadius: 15,
        borderWidth: 1.5,
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

    heartContainer: {
        marginLeft: 10,
    },

    stepperContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    stepperButton: {
        padding: 10,
    },
    stepperValue: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 20,
    },

    modalView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#870F4F',
        marginTop: 40,

    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    deleteIcon: {
        marginLeft: "auto",
    },

    backIcon: {
        marginRight: 10,
    },

    editButton: {
        marginLeft: 10,


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
        padding: 5,
        borderRadius: 10,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#870F4F",

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
        alignSelf: 'flex-start',
    },

    // switch styling
    switch: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },

    status: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    alignContainer: {
        flexDirection: 'row', // Display the components side by side
        justifyContent: 'space-between', // Adjust the spacing between the components
        marginBottom: 10, // Provide spacing between parent containers
        marginLeft: 20,
    },
    ingredientContainer: {

        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    quantityContainer: {
        flex: 1, // Added to make the container take equal space
        marginTop: 15,
        marginLeft: 15
    },
    unitText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
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
    },
    switch: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    switchText: {
        marginLeft: Platform.OS === 'ios' ? 10 : 0,
        color: '#444'
    }
});
export default styles;