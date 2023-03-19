import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import Home from './components/Home';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from './style/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarStyle: {display: "none"}, 
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"orange"} size={25} />
          ),
        }}/>
        <Tab.Screen name="Gameboard" component={Gameboard}
        options={{
          tabBarLabel: 'Gameboard',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="play" color={"orange"} size={25} />
          ),
        }}/>
        <Tab.Screen name="Scoreboard" component={Scoreboard}
        options={{
          tabBarLabel: 'Scoreboard',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="table" color={"orange"} size={25} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>
    
  );
}


