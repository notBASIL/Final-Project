import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        backgroundColor: '#d2fac3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        margin: 10,
        borderRadius: 10,

    },
    text:
    {
        color: '#Ff3404',
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
