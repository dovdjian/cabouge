import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Events from "../components/Events";
import Filtres from "../components/Filtres";
import { EventsContext } from "../contexts/EventsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchCity from "../components/SearchCity";
import ChooseDate from "../components/ChooseDate";

export default function Home({ navigation }) {
  const {
    setEventInfos,
    setModalVisible,
    setEventIndex,
    setSelectedCityCodeDep,
  } = useContext(EventsContext);

  useEffect(() => {
    // reload when coming back from other screens
    navigation.addListener("focus", () => {
      setEventInfos({});
      setEventIndex(0);
      setSelectedCityCodeDep("");
    });
  }, [setEventInfos, setEventIndex, setSelectedCityCodeDep]);

  return (
    <View style={styles.homeContainer}>
      <SearchCity />
      <View>
        <Text style={{ fontSize: 32, marginLeft: 10, fontFamily: "Questrial" }}>
          Que faire ?
        </Text>
      </View>
      <ChooseDate />
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
    top: 50,
  },
  searchBar: {},
});
