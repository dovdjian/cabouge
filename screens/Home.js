import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeCalendarStrip from "react-native-calendar-strip";

export default function Home({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View>
      <ReactNativeCalendarStrip
        startingDate={new Date()}
        selectedDate={selectedDate}
        onDateSelected={(date) => setSelectedDate(date)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  weekCalendarWrapper: {
    flex: 1,
    alignItems: "center",
  },
  weekCalendar: {
    width: document.body.clientWidth,
  },
});
