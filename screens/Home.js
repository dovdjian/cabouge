import { StyleSheet, View } from "react-native";

export default function Home({ navigation }) {
  return <View></View>;
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
