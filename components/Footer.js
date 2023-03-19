import React from "react";
import {Text, View} from "react-native";
import { styles } from "../style/styles";

export default Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Author: Veeti Oivo, TIK21SP
            </Text>
        </View>
    )
}