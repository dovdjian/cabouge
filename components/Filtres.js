import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { EventsContext } from "../contexts/EventsContext";

export default function Filtres() {
  const { filtres } = useContext(EventsContext);

  return (
    <View style={styles.filtres}>
      <FlatList
        //nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false} // TODO: false
        horizontal={true}
        data={filtres}
        //keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.filtre}>
            <Text style={styles.filtreText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filtres: {
    marginLeft: 10,
  },
  filtre: {
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: "#F2F2F2",
    border: "1px solid black",
    paddingHorizontal: 5,
  },
  filtreText: {},
});
