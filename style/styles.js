import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      textAlign: "center",
      alignContent: "center",
    },
    points: {
        justifyContent:"center" ,
        alignItems: "center",
        marginTop:15 ,
        marginLeft: 10,
        marginRight: 15,
        textAlign: "center",
    },
    dicepoints: {
        flexDirection: "row",
        width: 280,
        justifyContent: "center",
        alignContent: "center"
    },
    header: {
      marginBottom: 20,
      backgroundColor: "#d3a05e",
      padding: 10,
      },
      headerText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: 'bold',
        },
      footer: {
        marginTop: 20,
        backgroundColor: "#d3a05e",
        padding: 10,
      },
      footerText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        },
      title: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
      },
      author: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
      },
      gameboard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      gameinfo: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 16,
        margin: 15,
      },
      boldText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        margin: 15,
        fontWeight: "bold"
      },
      row: {
        padding: 5,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: "center",
      },
      flex: {
        flexDirection: "row"
      },
      button: {
        margin: 20,
        flexDirection: "row",
        padding: 10,
        marginHorizontal: 140,
        backgroundColor: "#d88e2c",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        color:"#52482b",
        fontSize: 20
      },
      textInput: {
        padding: 2,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "black",
        marginHorizontal: 90,
        textAlign: "center",
        fontSize: 18,
        borderRadius: 3,
      },
      subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 10,
        },
      dataTable: {
        fontSize: 18,
        padding: 4,
        margin: 4,
        borderWidth: 1,
        borderColor: "#4d4d4d",
        borderRadius: 4,
        backgroundColor: "#ffffff"
      },
      tableTitle: {
        fontWeight: "bold",
      }

})