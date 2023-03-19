import React, { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../style/styles";
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from "../constants/Game";
import { Col, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Footer from "./Footer";

let board = []

export default Gameboard = ({ route }) => {

    const [playerName, setPlayerName] = useState("");
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState("Game has not started");
    const [totalPoints, setTotalPoints] = useState(0);
    const [bonusPoints, setBonusPoints] = useState(BONUS_POINTS_LIMIT)
    const [scores, setScores] = useState([])

    // ** FOR DICE ROW IN THE TOP
    // This array has the information whether dice is selected or not
    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));
    // This array has dice spots for a throw
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

    //** FOR POINTS ROW IN THE BOTTOM
    // This array has the information whether the spot count has been selected or not
    const [dicePointsTotal, setDicePointsTotal] =
        useState(new Array(MAX_SPOT).fill(false));

    //** FOR SPOT COUNTS IN THE BOTTOM
    // This array has total points for different spots
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0));



    const row = [];
    if (nbrOfThrowsLeft === 3) {
        row.push(
            <MaterialCommunityIcons
                name="dice-multiple"
                key={"multiple-dice"}
                size={75}
                color={"#d88e2c"}
            >

            </MaterialCommunityIcons>
        )
    }
    else {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            row.push(
                <Pressable
                    key={row + i}
                    onPress={() => selectDice(i)}
                >
                    <MaterialCommunityIcons
                        name={board[i]}
                        key={row + i}
                        size={50}
                        color={getDiceColor(i)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            );
        }
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }


    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonsRow.push(
            <Col key={buttonsRow + diceButton}>
                <Pressable key={buttonsRow + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={45}
                        color={getDicePointsColor(diceButton)}
                        style={styles.container}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }
    // This will be done once when entering to gameboard first time
    useEffect(() => {
        if (playerName === "" && route.params?.player) {
            setPlayerName(route.params.player)
            getScoreboardData();
        }
    }, [])

    useEffect(() => {
        checkPoints();
        if (nbrOfThrowsLeft < NBR_OF_THROWS) {
            setStatus("Select and throw dices again");
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
        else if (selectedDicePoints.every(x => x)) {
            savePlayerPoints();
        }
    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        if (selectedDicePoints.every(x => x)) {
            setStatus("All points selected, game over.")
            savePlayerPoints();
            setNbrOfThrowsLeft(0)
        }
    })

    function getDiceColor(i) {
            return selectedDices[i] ? "black" : "#d88e2c"
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "black" : "orange"
    }

    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function selectDicePoints(i) {
        if (nbrOfThrowsLeft > 0) {
            setStatus("Throw 3 times before setting points")
        } else {

            let selected = [...selectedDices];
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal]
            if (selectedPoints[i]) {
                setStatus("You already selected points for " + [i + 1])
            } else {
                if (!selectedPoints[i]) {
                    selectedPoints[i] = true;
                    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                    points[i] = nbrOfDices * (i + 1);
                    setDicePointsTotal(points);
                }
                selected.fill(false);
                setSelectedDices(selected);
                setSelectedDicePoints(selectedPoints);
                setNbrOfThrowsLeft(NBR_OF_THROWS)
                return points[i]
            }
        }
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft === 0) {
            setStatus("Select your points")
        }
        else {
            let spots = [...diceSpots]
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1)
                    board[i] = "dice-" + randomNumber;
                    spots[i] = randomNumber
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setDiceSpots(spots);
            setStatus("Select and throw dices again")
        }
    }

    const checkPoints = () => {
        const sum = dicePointsTotal.reduce((total, a) => total + a, 0);
        setTotalPoints(sum)
        if (nbrOfThrowsLeft >= 0) {
            setTotalPoints(sum)
            checkBonusPoints(sum)
        }

    }

    const checkBonusPoints = (sum) => {
        const bonus = BONUS_POINTS_LIMIT - sum;

        if (bonus <= 0) {
            setBonusPoints(0)
            setTotalPoints(sum + BONUS_POINTS)
        }
        else if (bonus > 0) {
            setBonusPoints(bonus)
        }
    }



    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        }
        catch (error) {
            console.log("Read error:" + error.message);
        }
    }

    const savePlayerPoints = async () => {
        const currentDate = new Date().toLocaleDateString()
        const currentTime = new Date().toLocaleTimeString()

        const playerPoints = {

            name: playerName,
            date: currentDate,
            time: currentTime,
            points: totalPoints
        }
        try {
            const newScore = [...scores, playerPoints];
            console.log(newScore)
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        }
        catch (error) {
            console.log("Save error:" + error.message)
        }
    }

    return (
        <View>
            <ScrollView>
                <Header style={styles.header} />
                <View style={styles.row}>{row}</View>
                <Text style={styles.gameinfo}>Throws left:{nbrOfThrowsLeft}</Text>
                <Text style={styles.gameinfo}>{status}:</Text>
                <Pressable style={styles.button}
                    onPress={() => throwDices()}
                >
                    <Text style={styles.buttonText}>
                        Throw dices
                    </Text>
                </Pressable>
                <Text style={styles.boldText}>Total points: {totalPoints}</Text>
                <Text style={styles.gameinfo}> You need {bonusPoints} points for bonus</Text>
                <View style={styles.row}><Grid>{pointsRow}</Grid></View>
                <View style={styles.row}><Grid>{buttonsRow}</Grid></View>
                <Text style={styles.boldText}>Player: {playerName}</Text>
                <Footer></Footer>
            </ScrollView>
        </View>
    )
}