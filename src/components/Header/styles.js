import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        backgroundColor: '#870F4F',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 30,
        margin: 10,
        borderRadius: 10,

    },
    text:
    {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    text2:
    {
    paddingTop: 8,
    paddingRight: 15,
    },

});
export default styles;
