import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Events from "../components/Events";
import Filtres from "../components/Filtres";
import { EventsContext } from "../contexts/EventsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchCity from "../components/SearchCity";
import ChooseDate from "../components/ChooseDate";

export default function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <SearchCity />
      <View>
        <Text style={{ fontSize: 20, margin: 10 }}>Que faire ?</Text>
      </View>
      <Filtres />
      <ChooseDate />
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {},
});
