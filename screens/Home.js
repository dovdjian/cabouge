import * as React from "react";
import { StyleSheet, View } from "react-native";
import Events from "../components/Events";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  weekCalendarWrapper: {
    flex: 1,
    alignItems: "center",
  },
});
