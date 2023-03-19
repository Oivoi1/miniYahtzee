import React, { useEffect, useState } from "react";
import { Button, Text, View, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCOREBOARD_KEY } from "../constants/Game";
import { styles } from "../style/styles";
import Header from "./Header";
import Footer from "./Footer";
import { DataTable } from 'react-native-paper';

export default Scoreboard = ({navigation}) => {

    const [scores, setScores] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getScoreboardData();
        })
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try{
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null){
                let tmpScores = JSON.parse(jsonValue);
                let newScores = tmpScores.sort((a, b) => a.points < b.points)
                setScores(newScores);
                // Sort results here for the rendering
                
                

            }
        }
        catch(error){
            console.log( "Read error:" + error.message);
        }
    }
    

    return (
        <View>
            <ScrollView>
            <Header/>
            <Text style={styles.boldText}>Top scores:</Text>
            {scores.length < 1 
                ?
                <Text style={styles.gameinfo}>Scoreboard is empty</Text>
                :
            <View style={styles.score}>
                {scores.map((player, i) => (
                    <>
                    <DataTable style={styles.dataTable}>
                    <DataTable.Row key={i} >
                      <DataTable.Cell >{i + 1}. {player.name}</DataTable.Cell>
                      <DataTable.Cell numeric>{player.date}</DataTable.Cell>
                      <DataTable.Cell numeric>{player.time}</DataTable.Cell>
                      <DataTable.Cell numeric>{player.points}</DataTable.Cell>
                    </DataTable.Row>
                    </DataTable>                    
                    </>
                ))}
            </View>
            }
            <Footer/>
            </ScrollView>
        </View>
    )
}
//<Text style={styles.scoreText} key={i}>{i + 1}. {player.name}, {player.date}, {player.time},  Points: {player.points}</Text>