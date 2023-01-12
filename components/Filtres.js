import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { EventsContext } from "../contexts/EventsContext";

export default function Filtres() {
  const { filtres } = useContext(EventsContext);

  return (
    <View style={styles.container}>
      <FlatList
        //nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false} // TODO: false
        horizontal={true}
        data={filtres}
        //keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  item: {
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: "#F2F2F2",
    width: 109,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 20,
  },
});
