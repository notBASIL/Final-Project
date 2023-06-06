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
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
});
export default styles;
