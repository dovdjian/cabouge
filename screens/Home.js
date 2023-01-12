import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Events from "../components/Events";
import Filtres from "../components/Filtres";
import { EventsContext } from "../contexts/EventsContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ navigation }) {
  const [day, setDay] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [tempDay, setTempDay] = useState({});
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [confirmDate, setConfirmDate] = useState(false);

  console.log(day);
  const handleConfirmDate = (day) => {
    setConfirmDate(false);
    setDisplayCalendar(false);
    setDay(day);
  };

  const handleCloseCalendar = () => {
    setDisplayCalendar(false);
    setConfirmDate(false);
  };

  return (
    <View style={styles.homeContainer}>
      <View>
        <Text style={{ fontSize: 20, margin: 10 }}>Que faire ?</Text>
      </View>
      <Filtres />
      {displayCalendar ? (
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
            setTempDay(day);
            setConfirmDate(!confirmDate);
          }}
          enableSwipeMonths={true}
          renderHeader={(date) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity onPress={() => handleCloseCalendar()}>
                  <Text>
                    {date.toString().substring(4, 7)} {date.getFullYear()}
                  </Text>
                </TouchableOpacity>
                {confirmDate ? (
                  <TouchableOpacity onPress={() => handleConfirmDate(tempDay)}>
                    <Ionicons name="checkmark-circle-outline" size={24} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            );
          }}
        />
      ) : (
        <TouchableOpacity
          style={{ fontSize: 20, margin: 10, flexDirection: "row" }}
          onPress={() => setDisplayCalendar(true)}
        >
          <Text style={{ fontSize: 20 }}>
            {day.day}/{day.month}/{day.year}
          </Text>
          <Ionicons name="chevron-down-outline" size={24} style={{}} />
        </TouchableOpacity>
      )}
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {
    backgroundColor: "#F5F5F5",
  },
});
