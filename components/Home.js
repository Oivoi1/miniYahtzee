import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Pressable, Keyboard } from "react-native";
import { styles } from "../style/styles";
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import Footer from "./Footer";


export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState("");
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <Header></Header>
            {!hasPlayerName
                ?
                <>
                    <Text style={styles.gameinfo}>For scoreboard enter your name</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true} style={styles.textInput} />
                    <Pressable onPress={() => handlePlayerName(playerName)}
                        style={styles.button}>
                        <Text>OK</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text style={styles.subHeader}>Rules of the game</Text>
                    <Text style={styles.gameinfo}>THE GAME: Upper section of the classic Yahtzee
                        dice game. You have {NBR_OF_DICES} dices and
                        for the every dice you have {NBR_OF_THROWS}
                        throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}.
                        Game ends when all points have been selected.
                        The order for selecting those is free.</Text>
                    <Text style={styles.gameinfo}>
                        POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from 
                        {MIN_SPOT} to {MAX_SPOT} again.</Text>
                    <Text style={styles.gameinfo}>
                        GOAL: To get points as much as possible.
                        {BONUS_POINTS_LIMIT} points is the limit of
                        getting bonus which gives you {BONUS_POINTS}
                        points more.</Text>
                    <Text style={styles.subHeader}>Good luck, {playerName}</Text>
                    <Pressable onPress={() => navigation.navigate("Gameboard", { player: playerName })} style={styles.button}>
                        <Text>PLAY</Text>
                    </Pressable>
                </>
            }
            <Footer></Footer>
            </ScrollView>
        </View>
    )
}